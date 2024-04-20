import { useEffect, useState } from 'react';
import { db, storage } from '../configs/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function ChatRoomList() {
  const [posts, setPosts] = useState([]); // State to store the list of posts
  const [text, setText] = useState(''); // State to store the text input
  const [image, setImage] = useState(null); // State to store the selected image file

  const postsCollection = collection(db, 'posts'); // Reference to the 'posts' collection in Firestore

  useEffect(() => {
    getPosts(); // Fetch the list of posts on component mount
  }, []);

  const getPosts = async () => {
    try {
      // Subscribe to real-time updates on the posts collection, ordered by timestamp in descending order
      const unsubscribe = onSnapshot(query(postsCollection, orderBy('timestamp', 'desc')), (snapshot) => {
        // Map the document data and add an 'id' property to each document
        const updatedPosts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPosts(updatedPosts); // Update the posts state with the updated data
      });
      return () => unsubscribe(); // Unsubscribe from real-time updates when the component unmounts
    } catch (error) {
      console.error(error);
    }
  };

  const savePost = async () => {
    try {
      if (text.trim() === '') {
        return; // If the text is empty or contains only whitespace, do not save
      }

      let imageUrl = null;
      if (image) {
        const storageRef = ref(storage, `images/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Add a new document to the posts collection with the provided text, image URL, and server timestamp
      await addDoc(postsCollection, {
        text,
        imageUrl,
        timestamp: serverTimestamp(),
      });

      setText(''); // Clear the text input field after saving
      setImage(null); // Clear the image file after saving
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Post List</h1>
      <input
        type='text'
        placeholder='Text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type='file'
        accept='image/'
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={savePost}>Save</button>
      {posts.map((post, index) => (
        <div key={index}>
          <h3>{post.text}</h3>
          {post.imageUrl && <img src={post.imageUrl} alt='Post' style={{ maxWidth: '100px' }} />}
          <p>{post.timestamp?.toDate().toLocaleString()}</p>
        </div>
      ))}
    </>
  );
}

export default ChatRoomList;
