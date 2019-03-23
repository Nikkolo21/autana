import { firestoreDB } from "../base";

export const createAtom = (atomObj, thenFn, catchFn) => {
    firestoreDB.collection("atoms").add(atomObj).then(thenFn).catch(catchFn);
}

export const getAtomsByProjectId = (id, order, thenFn, catchFn) => {
    firestoreDB.collection("atoms").where("projectId", "==", id).orderBy(order.orderBy, order.orderType).get().then(thenFn).catch(catchFn);
}

export const getAtom = (id, thenFn, catchFn) => {
    firestoreDB.collection("atoms").doc(id).get().then(thenFn).catch(catchFn);
}

export const editAtom = (id, data, thenFn, catchFn) => {
    firestoreDB.collection("atoms").doc(id).set(data, { merge: true }).then(thenFn).catch(catchFn);
}

export const createPub = (pubObj, thenFn, catchFn) => {
    firestoreDB.collection("publications").add(pubObj).then(thenFn).catch(catchFn);
}

export const getPubByAtomId = (id, thenFn, catchFn) => {
    firestoreDB.collection("publications").where("atomId", "==", id).get().then(thenFn).catch(catchFn);
}

export const getPub = (id, thenFn, catchFn) => {
    firestoreDB.collection("publication").doc(id).get().then(thenFn).catch(catchFn);
}

export const editPub = (id, data, thenFn, catchFn) => {
    firestoreDB.collection("publications").doc(id).set(data, { merge: true }).then(thenFn).catch(catchFn);
}