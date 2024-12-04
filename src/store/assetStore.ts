// src/store/assetStore.ts
import { create } from "zustand";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/database/firebaseConfig";
import { Asset, AssetStatus } from "@/types/asset";

interface AssetStore {
  assets: Asset[];
  fetchAssets: () => Promise<void>;
  addAsset: (newAsset: Omit<Asset, "id" | "createdAt">) => Promise<void>;
  updateAsset: (id: string, updatedFields: Partial<Asset>) => Promise<void>;
  deleteAsset: (id: string) => Promise<void>;
}

const useAssetStore = create<AssetStore>((set) => ({
  assets: [],
  fetchAssets: async () => {
    const querySnapshot = await getDocs(collection(db, "assets"));
    const assetsData: Asset[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      assetsData.push({
        id: doc.id,
        code: data.code || "",
        name: data.name || "",
        category: data.category || "",
        value: data.value || 0,
        acquisitionDate: data.acquisitionDate || "",
        lifespan: data.lifespan || 0,
        location: data.location || "",
        condition: data.condition || "",
        responsible: data.responsible || "",
        status: (data.status as AssetStatus) || "inactive",
        createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
      });
    });
    set({ assets: assetsData });
  },
  addAsset: async (newAsset: Omit<Asset, "id" | "createdAt">) => {
    const docRef = await addDoc(collection(db, "assets"), {
      ...newAsset,
      createdAt: serverTimestamp(), // Add server timestamp for createdAt
    });
    set((state) => ({
      assets: [
        ...state.assets,
        { id: docRef.id, ...newAsset, createdAt: new Date() }, // Assume current date for optimistic update
      ],
    }));
  },
  updateAsset: async (id: string, updatedFields: Partial<Asset>) => {
    const assetDoc = doc(db, "assets", id);
    await updateDoc(assetDoc, updatedFields);
    set((state) => ({
      assets: state.assets.map((asset) =>
        asset.id === id ? { ...asset, ...updatedFields } : asset
      ),
    }));
  },
  deleteAsset: async (id: string) => {
    const assetDoc = doc(db, "assets", id);
    await deleteDoc(assetDoc);
    set((state) => ({
      assets: state.assets.filter((asset) => asset.id !== id),
    }));
  },
}));

export default useAssetStore;
