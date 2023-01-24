const Actor = ({ name, id, profile_image }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <img src={profile_image} alt={name} className="w-16 h-16 rounded-full object-cover mx-auto mb-4" />
        <div className="text-gray-700 text-center">
          <div className="font-medium text-lg">{name}</div>
          <div className="text-sm">ID: {id}</div>
        </div>
      </div>
    </div>
  );
};

export default Actor;