import React from "react";

const DeleteModal = ({ deleteUser, cancleDelete, deleteHandler }) => {
  return (
    <div>
      <input type='checkbox' id='delete-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>
            {`Want to Delete ${deleteUser?.name} ?`}
          </h3>
          <div className='modal-action'>
            <label
              onClick={() => deleteHandler(deleteUser)}
              htmlFor='delete-modal'
              className='btn btn-accent'
            >
              Delete
            </label>
            <button onClick={cancleDelete} className='btn btn-primary'>
              Cancle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
