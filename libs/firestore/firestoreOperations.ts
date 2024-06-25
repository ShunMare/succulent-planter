import { collection, addDoc, setDoc, doc, getDocs, deleteDoc, DocumentReference } from 'firebase/firestore';
import { db } from './firebase';

const targetName = "userOthers";
const targetList = [
  { userId: "7IPFOuLIYUEYC7ykDWVh", entityId: 1, projectId: "RBDtPHZdbPotLhjzT7SC" },
];

/**
 * Firestoreに対象のリストを追加する関数
 * @param collectionName Firestoreのコレクション名
 * @param dataList 追加するデータの配列
 */
export const addTargetsToFirestore = async (collectionName: string, dataList: string[]) => {
  const targetsCollectionRef = collection(db, targetName);
  for (const target of targetList) {
    await addDoc(targetsCollectionRef, target).catch(error => console.error("Error adding document: ", error));
  }
};

/**
 * Firestoreにドキュメントのバッチ追加を行う関数
 * @param collectionName Firestoreのコレクション名
 * @param dataList 追加するデータオブジェクトの配列
 * @returns 追加されたドキュメントの参照の配列
 */
export const batchAddDocumentsToFirestore = async (collectionName: string, dataList: any[]) => {
  const collectionRef = collection(db, collectionName);
  const docRefs = [];
  for (const data of dataList) {
    const docRef = await addDoc(collectionRef, data);
    docRefs.push(docRef);
    console.log(`${collectionName} added successfully. Document ID:`, docRef.id);
  }
  return docRefs;
};

/**
 * Firestoreにドキュメントをバッチ追加または更新する関数
 * @param collectionName Firestoreのコレクション名
 * @param dataList 更新または追加するデータオブジェクトの配列
 * @returns 処理されたドキュメントの参照とIDの配列
 */
export const batchAddOrUpdateDocumentsToFirestore = async (collectionName: string, dataList: any[]) => {
  const collectionRef = collection(db, collectionName);
  const docRefs = [];
  for (const data of dataList) {
    let docRef;
    if ('id' in data && data.id) {
      const docId = data.id;
      delete data.id;
      docRef = doc(collectionRef, docId);
      await setDoc(docRef, data, { merge: true });
      console.log(`${collectionName} updated successfully. Document ID:`, docId);
    } else {
      docRef = await addDoc(collectionRef, data);
      console.log(`${collectionName} added successfully. Document ID:`, docRef.id);
    }
    docRefs.push({ ...docRef, id: docRef.id });
  }
  return docRefs;
};

/**
 * Firestore内のドキュメントをバッチ処理する関数
 * @param collectionName Firestoreのコレクション名
 * @param dataList 処理するデータオブジェクトの配列
 * @returns 処理されたドキュメントの参照の配列
 */
export const batchProcessDocumentsInFirestore = async (collectionName: string, dataList: any[]) => {
  const collectionRef = collection(db, collectionName);
  const docRefs: DocumentReference[] = [];
  for (const data of dataList) {
    let docRef;
    if (data.id) {
      docRef = doc(collectionRef, data.id);
      await setDoc(docRef, data, { merge: true });
    } else {
      docRef = await addDoc(collectionRef, data);
    }
    docRefs.push(docRef);
    console.log(`${collectionName} added or updated successfully. Document ID:`, docRef.id);
  }
  return docRefs;
};

/**
 * Firestore内のドキュメントをバッチで削除する関数
 * @param collectionName Firestoreのコレクション名
 * @param dataList 削除するデータオブジェクトの配列
 * @returns 削除されたドキュメントの参照の配列
 */
export const batchDeleteDocumentsInFirestore = async (collectionName: string, dataList: any[]) => {
  const collectionRef = collection(db, collectionName);
  const docRefs: DocumentReference[] = [];
  console.log("deldataList", dataList);
  for (const data of dataList) {
    if (data.id) {
      const docRef = doc(collectionRef, data.id);
      await deleteDoc(docRef);
      console.log(`${collectionName} document deleted successfully. Document ID:`, docRef.id);
      docRefs.push(docRef);
    }
  }
  return docRefs;
};

/**
 * ユーザーのドキュメントを更新または新規作成する関数
 * @param docId ドキュメントID（新規作成の場合は空文字）
 * @param collectionName Firestoreのコレクション名
 * @param data 更新または作成するデータオブジェクト
 */
export const updateOrCreateUserDocument = async (docId: string, collectionName: string, data: Object) => {
  try {
    const collectionRef = collection(db, collectionName);
    if (docId === "") {
      const docRef = await addDoc(collectionRef, data);
      console.log(`${collectionName} added successfully with new docId: ${docRef.id}`);
    } else {
      const docRef = doc(collectionRef, docId);
      await setDoc(docRef, data);
      console.log(`${collectionName} added or updated successfully for docId:`, docId);
    }
  } catch (e) {
    console.error("Error adding or updating document:", e);
  }
};

const flattenPlantData = (plantData: any) => {
  const flatData: any[] = [];
  for (const section in plantData) {
    plantData[section].forEach((row: any, rowIndex: number) => {
      row.forEach((plant: any, plantIndex: number) => {
        flatData.push({
          section,
          rowIndex,
          plantIndex,
          ...plant,
        });
      });
    });
  }
  return flatData;
};

export const savePlantDataToFirestore = async (collectionName: string, data: any) => {
  try {
    const flatData = flattenPlantData(data);

    for (const item of flatData) {
      const docRef = item.id ? doc(collection(db, collectionName), item.id) : doc(collection(db, collectionName));
      if (item.id) {
        // ドキュメントが存在する場合、更新する
        await setDoc(docRef, item, { merge: true });
        console.log("Document updated with ID: ", docRef.id);
      } else {
        // ドキュメントが存在しない場合、新規作成する
        await addDoc(collection(db, collectionName), item);
        console.log("Document written with ID: ", docRef.id);
      }
    }
  } catch (error) {
    console.error("Error saving document: ", error);
    throw error;
  }
};

export const fetchPlantDataFromFirestore = async (collectionName: string) => {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    const plantData: any = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const { section, rowIndex, plantIndex, ...plant } = data;
      if (!plantData[section]) {
        plantData[section] = [];
      }
      if (!plantData[section][rowIndex]) {
        plantData[section][rowIndex] = [];
      }
      plantData[section][rowIndex][plantIndex] = plant;
    });

    return plantData;
  } catch (error) {
    console.error("Error fetching plant data: ", error);
    throw error;
  }
};
