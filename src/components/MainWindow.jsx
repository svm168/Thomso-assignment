import React, { useState } from 'react'
import ViewNoteCard from './ViewNoteCard'

function MainWindow({ notes, onShowAddNotePopup }) {
    const [showNote, setShowNote] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)

    return (
        <div className='flex-1 p-6 bg-gray-100 overflow-y-auto'>    {/* overflow-y-auto is written to allow scrolling. */}
            <div className='flex items-center justify-center md:justify-between mb-4'>
                <h2 className='text-2xl font-bold'>Saved Notes</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {notes.map((note, index) => (
                    <div key={index} className='bg-white rounded-xl p-3 cursor-pointer' onClick={() => { setSelectedNote(note); setShowNote(true) }}>

                        <div className="w-full h-46 mb-2 flex items-center justify-center bg-gray-100 rounded-t-xl">
                            {note.image ? (
                                <img src={note.image} alt="note" className="w-full h-46 object-contain rounded-t-xl" />
                            ) : (
                                <span className="text-2xl text-gray-300">No Image</span>
                            )}
                        </div>

                        <h3 className="text-md font-bold mb-1 text-center">{note.title}</h3>
                        <p className='text-gray-800'>{note.text}</p>
                    </div>
                ))}

                {/* Add new note card: */}
                <div className='bg-white rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer' onClick={onShowAddNotePopup}>
                    <div className='flex items-center justify-center w-full h-46 bg-gray-100 rounded-t-xl mb-2'>
                        <span className='text-4xl text-blue-500'>+</span>
                    </div>
                    <h3 className="text-md font-bold mb-1 text-gray-500">Add Note</h3>
                    <p className='text-gray-500'>Create a new note</p>
                </div>
            </div>

            {showNote && (<ViewNoteCard note={selectedNote} onClose={() => setShowNote(false)}/>)}
        </div>
    )
}

export default MainWindow
