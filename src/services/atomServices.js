import { firestoreDB } from "../base";

export const createAtom = (atomObj, thenFn, catchFn) => {
    firestoreDB.collection("atoms").add(atomObj).then(thenFn).catch(catchFn);
}

export const getTreeByProjectId = (projectId, thenFn, catchFn) => {
    firestoreDB.collection("projects.trees").where("project_id", "==", projectId).get().then(thenFn).catch(catchFn);
}

export const updateProjectTree = (id, data, thenFn, catchFn) => {
    firestoreDB.collection("projects.trees").doc(id).set(data, { merge: true }).then(thenFn).catch(catchFn);
}