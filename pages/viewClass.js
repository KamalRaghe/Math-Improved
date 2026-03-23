

export default function View(){
     async function saveName(){
        )
        const querySnapshot = await getDocs(collection(db, n));
        setData(querySnapshot)
        console.log('cwi')
        querySnapshot.forEach((doc) => {
            console.log(doc.id, doc.data());
        });
    }
}