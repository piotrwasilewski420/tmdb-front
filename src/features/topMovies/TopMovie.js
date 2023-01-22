const TopMovie = ({movie,rating}) => {
    const {id, title, tagline, poster_path, released} = movie;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <img src={poster_path} alt={title} className="w-2/3 rounded-lg" />
      <div className="pt-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex items-center my-2">
          <span className="text-gray-600">Released: {released}</span>
          <span className="ml-4 text-gray-600">
            Rating: {rating}/5
          </span>
        </div>
        <p className="text-gray-600">{tagline}</p>
        <p className="text-gray-600">ID: {id}</p>
      </div>
    </div>
  );
};

export default TopMovie;
