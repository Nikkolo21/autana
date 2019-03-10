import { firestoreDB } from "../base";

export const createAtom = (atomObj, thenFn, catchFn) => {
    firestoreDB.collection("atoms").add(atomObj).then(thenFn).catch(catchFn);
}

export const getAtomsByProjectId = (id, order, thenFn, catchFn) => {
    firestoreDB.collection("atoms").where("projectId", "==", id).orderBy(order.orderBy, order.orderType).get().then(thenFn).catch(catchFn);
}