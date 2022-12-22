import React from "react";

const DeleteModal = ({ deleteItem, cancleDelete, deleteHandler }) => {
  return (
    <div>
      <input type='checkbox' id='delete-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>
            {`Want to Delete ${deleteItem?.name} ?`}
          </h3>
          <div className='modal-action'>
            <label
              onClick={() => deleteHandler(deleteItem)}
              htmlFor='delete-modal'
              className='btn btn-accent'
            >
              Delete
            </label>
            <button onClick={cancleDelete} className='btn btn-primary'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
