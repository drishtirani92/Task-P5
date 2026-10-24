import bcrypt from 'bcryptjs';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';

const USERS = 'users';
const SALT_ROUNDS = 10;

// The lower-cased email is used as the document ID, which guarantees that
// two accounts can never share the same email address.
const userRef = (email) => doc(db, USERS, email.trim().toLowerCase());

// Turns a low-level error into a clear message and logs the real cause
// to the browser console (F12) so problems are easy to diagnose.
export function describeError(err) {
  console.error('DEV@Deakin error:', err);
  switch (err?.code) {
    case 'permission-denied':
      return 'Database permission denied. Publish your Firestore rules (test mode).';
    case 'unavailable':
      return 'Cannot reach Firestore. Check that the database is created and you are online.';
    case 'not-found':
      return 'Firestore database not found. Create it in the Firebase console.';
    case 'invalid-argument':
      return 'Firebase settings look wrong. Check your .env file and restart the dev server.';
    default:
      return `Something went wrong: ${err?.code || err?.message || 'unknown error'}`;
  }
}

export async function registerUser({ firstName, lastName, email, password }) {
  const ref = userRef(email);
  const existing = await getDoc(ref);
  if (existing.exists()) {
    throw new Error('EMAIL_EXISTS');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  await setDoc(ref, {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim().toLowerCase(),
    passwordHash, // only the bcrypt hash is stored, never the password
    createdAt: serverTimestamp(),
  });
}

export async function loginUser({ email, password }) {
  const snapshot = await getDoc(userRef(email));
  if (!snapshot.exists()) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const user = snapshot.data();
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  // Never return the hash to the rest of the app.
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
}
