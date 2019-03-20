import { firestoreDB } from "../base";

export const createProject = (data, thenFn, catchFn) => {
    firestoreDB.collection("projects").add(data).then(thenFn).catch(catchFn);
}

export const getProject = (id, thenFn, catchFn) => {
    firestoreDB.collection("projects").doc(id).get().then(thenFn).catch(catchFn);
}

export const getProjectsByUserId = (id, order, thenFn, catchFn) => {
    firestoreDB.collection("projects").where("userId", "==", id).orderBy(order.orderBy, order.orderType).get().then(thenFn).catch(catchFn);
}

export const updateProject = (id, data, thenFn, catchFn) => {
    firestoreDB.collection("projects").doc(id).set(data, { merge: true }).then(thenFn).catch(catchFn);
}
