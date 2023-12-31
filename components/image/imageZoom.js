const ImageZoomModal = ({ isSetImageZoomModal, image }) => {
  return (
    <>
      <div
        className="z-50 inset-0 fixed bg-black/50"
        onClick={(e) => isSetImageZoomModal(false)}
      >
        <img
          className="object-contain fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src={`http://localhost:5000/${image}`}
        />
      </div>
    </>
  );
};

export default ImageZoomModal;
