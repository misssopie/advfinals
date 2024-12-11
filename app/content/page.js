'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { FaSearch, FaHeart, FaRegHeart, FaThumbsUp, FaSignOutAlt } from 'react-icons/fa';

const ContentPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [touristSpots, setTouristSpots] = useState([]);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
        fetchTouristSpots();
        fetchFavorites(currentUser.uid);
        fetchReactions(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchTouristSpots = async () => {
    const spotsQuery = query(collection(db, 'place'));
    const snapshot = await getDocs(spotsQuery);
    const spotsData = snapshot.docs.map(doc => doc.data());
    setTouristSpots(spotsData);
    setFilteredSpots(spotsData);
  };

  const fetchFavorites = async (userId) => {
    const favoritesQuery = query(collection(db, 'favorites'), where('userId', '==', userId));
    const snapshot = await getDocs(favoritesQuery);
    const favoritesData = snapshot.docs.map(doc => doc.data());
    setFavorites(favoritesData);
  };

  const fetchReactions = async (userId) => {
    const reactionsQuery = query(collection(db, 'reactions'), where('userId', '==', userId));
    const snapshot = await getDocs(reactionsQuery);
    const reactionsData = snapshot.docs.reduce((acc, doc) => {
      const { spotId, reactionType } = doc.data();
      acc[spotId] = reactionType;
      return acc;
    }, {});
    setReactions(reactionsData);
  };

  const handleSearch = (e) => {
    const queryText = e.target.value;
    setSearchQuery(queryText);
    if (queryText === '') {
      setFilteredSpots(touristSpots);
    } else {
      const results = touristSpots.filter(spot =>
        spot.name.toLowerCase().includes(queryText.toLowerCase())
      );
      setFilteredSpots(results);
    }
  };

  const handleFilter = (category) => {
    setSelectedFilter(category);
    if (category === '') {
      setFilteredSpots(touristSpots);
    } else {
      const filtered = touristSpots.filter(spot => spot.category === category);
      setFilteredSpots(filtered);
    }
  };

  const handleLogOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  const addToFavorites = async (spotId, spotName) => {
    const favoriteRef = query(
      collection(db, 'favorites'),
      where('userId', '==', user.uid),
      where('spotId', '==', spotId)
    );
    const snapshot = await getDocs(favoriteRef);
    if (snapshot.empty) {
      await addDoc(collection(db, 'favorites'), {
        userId: user.uid,
        spotId,
        spotName,
        createdAt: new Date(),
      });
      fetchFavorites(user.uid);
    } else {
      await deleteDoc(doc(db, 'favorites', snapshot.docs[0].id));
      fetchFavorites(user.uid);
    }
  };

  const handleReaction = async (spotId, spotName, reactionType) => {
    const reactionRef = query(
      collection(db, 'reactions'),
      where('userId', '==', user.uid),
      where('spotId', '==', spotId)
    );
    const snapshot = await getDocs(reactionRef);
    if (snapshot.empty) {
      await addDoc(collection(db, 'reactions'), {
        userId: user.uid,
        spotId,
        spotName,
        reactionType,
        createdAt: new Date(),
      });
      setReactions(prevState => ({ ...prevState, [spotId]: reactionType }));
    } else {
      await deleteDoc(doc(db, 'reactions', snapshot.docs[0].id));
      setReactions(prevState => ({ ...prevState, [spotId]: null }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center p-6 bg-indigo-600 text-white">
        <h1 className="text-2xl font-bold flex items-center">
          <FaHeart className="mr-2" /> Tourist Spots in Palawan
        </h1>
        <button
          onClick={handleLogOut}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaSignOutAlt /> Log Out
        </button>
      </div>

      <div className="flex justify-center items-center p-6 space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-l-md w-64"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button
          onClick={() => handleSearch({ target: { value: searchQuery } })}
          className="bg-indigo-500 text-white p-2 rounded-r-md"
        >
          <FaSearch />
        </button>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={() => handleFilter('')} className="bg-indigo-500 text-white p-2 rounded-md">
          All
        </button>
        <button onClick={() => handleFilter('nature')} className="bg-green-500 text-white p-2 rounded-md">
          Nature
        </button>
        <button onClick={() => handleFilter('beach')} className="bg-blue-500 text-white p-2 rounded-md">
          Beach
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredSpots.map((spot) => (
          <div key={spot.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={spot.imageUrl}
              alt={spot.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{spot.name}</h2>
              <p className="text-sm text-gray-600">{spot.description}</p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => addToFavorites(spot.id, spot.name)}
                    className={`bg-red-500 text-white p-4 rounded-full transition-transform transform hover:scale-110 ${favorites.some(fav => fav.spotId === spot.id) ? 'bg-red-600' : ''}`}
                    title={favorites.some(fav => fav.spotId === spot.id) ? "Remove from Favorites" : "Add to Favorites"}
                  >
                    {favorites.some(fav => fav.spotId === spot.id) ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
                  </button>
                  <button
                    onClick={() => handleReaction(spot.id, spot.name, reactions[spot.id] === 'like' ? null : 'like')}
                    className={`bg-blue-500 text-white p-4 rounded-full transition-transform transform hover:scale-110`}
                    title="Like"
                  >
                    {reactions[spot.id] === 'like' ? <FaThumbsUp className="text-xl" /> : <FaThumbsUp className="text-xl opacity-50" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPage;
