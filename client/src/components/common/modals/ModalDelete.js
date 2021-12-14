import "./ModalDelete.css";

const ModalDelete = ({
  showModal,
  closeModal,
  deleteHandler,
  children,
  id,
}) => {
  const showHideClassName = showModal ? "modal show" : "modal hide";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-buttons">
          <button className="delete" onClick={() => deleteHandler(id)}>
            Yes
          </button>
          <button className="cancel" onClick={closeModal}>
            No
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModalDelete;
