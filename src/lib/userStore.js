import { getDoc, doc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from './firebase';

const useUserStore = create((set) => ({
  currentUser: null,

  fetchUserInfo: async (uid) => {
    if (!uid) {
      return set({ currentUser: null });
    }

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data() });
      } else {
        set({ currentUser: null });
      }
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      set({ currentUser: null });
    }
  }
}));

export { useUserStore };
