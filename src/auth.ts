import { auth } from './firebase';
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth';

const actionCodeSettings = {
  url: window.location.origin + '/finishSignIn',
  handleCodeInApp: true,
};

export async function startEmailLink(email: string) {
  localStorage.setItem('pendingEmail', email);
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
}

export async function completeEmailLink() {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    const email = localStorage.getItem('pendingEmail') || window.prompt('Confirm your email:');
    if (!email) throw new Error('Missing email');
    await signInWithEmailLink(auth, email, window.location.href);
    localStorage.removeItem('pendingEmail');
  }
}
