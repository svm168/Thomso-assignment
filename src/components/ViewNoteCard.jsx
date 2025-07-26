import React from "react"

function ViewNoteCard({ note, onClose }) {
    return(
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-xl p-6 max-w-md w-full relative" onClick={(event) => event.stopPropagation()}>
                <button onClick={onClose} className="absolute top-1 right-1.5 text-xl text-gray-500 hover:text-black"> &times; </button>

                <div className="w-full h-48 mb-4 flex items-center justify-center bg-gray-100 rounded-t-xl">
                    {note.image ? (
                        <img src={note.image} alt="note" className="w-full h-48 object-contain rounded-xl" />
                    ) : (
                        <span className="text-4xl text-gray-300">No Image</span>
                    )}
                </div>

                <h3 className="text-lg font-bold mb-2">{note.title}</h3>
                <p className="text-gray-800">{note.text}</p>
            </div>
        </div>
    )
}

export default ViewNoteCard