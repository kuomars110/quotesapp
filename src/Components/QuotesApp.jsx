import { useState, useEffect } from "react";

const QuotesApp = () => {
  const [quote, setQuote] = useState({
    text: "Ask not what your country can do for you; ask what you can do for your country.",
    author: "John Kennedy",
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchNewQuote = async () => {
      const url = "https://api.quotable.io/random";
      const res = await fetch(url);
      const data = await res.json();
      setQuote({
        text: data.content,
        author: data.author,
      });
    };
    fetchNewQuote();
  }, []);

  const fetchNewQuote = async () => {
    const url = "https://api.quotable.io/random";
    const res = await fetch(url);
    const data = await res.json();
    setQuote({
      text: data.content,
      author: data.author,
    });
  };
  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const addToFavorites = () => {
    const isAlreadyInFav = favorites.some((fav) => fav.text === quote.text);
    if (!isAlreadyInFav) {
      setFavorites([...favorites, quote]);
    }
  };

  return (
    <div className="container">
      <div className="quotes-app">
        <h1 className="app-heading">Quote.</h1>
        <i onClick={toggleFavorites} className="bx bxs-heart fav-icon"></i>
        <div className="quote">
          <i className="bx bxs-quote-alt-left left-quote"></i>
          <p className="quote-text">{quote.text}</p>
          <p className="quote-author">{quote.author}</p>
          <i className="bx bxs-quote-alt-right right-quote"></i>
        </div>
        <div className="circles">
          <div className="circle-1"></div>
          <div className="circle-2"></div>
          <div className="circle-3"></div>
          <div className="circle-4"></div>
        </div>
        <div className="buttons">
          <button onClick={fetchNewQuote} className="btn btn-new">
            New Quote
          </button>
          <button onClick={addToFavorites} className="btn btn-fav">
            Add to Favorites
          </button>
        </div>
        {showFavorites && (
          <div className="favorites">
            <button onClick={toggleFavorites} className="btn-close">
              <i className="bx bx-x"></i>
            </button>
            {favorites.map((favQuote, index) => (
              <div key={index} className="fav-quote">
                <div className="fav-quote-delete">
                  <i
                    onClick={() => {
                      const updatedFavorites = favorites.filter(
                        (item, i) => i !== index
                      );
                      setFavorites(updatedFavorites);
                    }}
                    className="bx bx-x-circle"
                  ></i>
                </div>
                <div className="fav-quote-content">
                  <div className="fav-quote-text">{favQuote.text}</div>
                  <div className="fav-quote-author">{favQuote.author}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesApp;
