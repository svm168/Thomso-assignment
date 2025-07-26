import React, { useState } from 'react'

function AddNotePopup({ onAddNote, onClose }) {
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const handleImageSelect = () => {
        const fileInput = document.createElement('input')
        fileInput.type = 'file'
        fileInput.accept = 'image/*'
        fileInput.onchange = e => {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result)
            }
            if (file) reader.readAsDataURL(file)
        }
        fileInput.click()
    }

    const handleSubmit = () => {
        if (title && text) {
            onAddNote({ image, title, text })
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm relative">
                <button className="absolute top-1 right-1 text-lg text-gray-500 hover:text-gray-700" onClick={onClose}> &times; </button>

                <div className="flex flex-col items-center">
                    <div className="w-full h-46 mb-2 flex items-center justify-center bg-gray-100 rounded-t-xl">
                        {image ? (
                            <img src={image} className="w-full h-46 object-contain rounded" />
                        ) : (
                            <button className="cursor-pointer" onClick={handleImageSelect}>
                                <span className="text-3xl text-blue-500 hover:text-blue-600">+</span>
                            </button>
                        )}
                    </div>

                    <input type="text" className="border rounded-xl outline-none w-full p-2 mb-2" placeholder="Enter Note Title" value={title} onChange={event => setTitle(event.target.value)} />
                    <input type="text" className="border rounded-xl outline-none w-full p-2 mb-4" placeholder="Enter Note Text" value={text} onChange={event => setText(event.target.value)} />

                    <div className="flex w-full space-x-2">
                        <button className="bg-gray-400 text-white px-4 py-2 rounded-xl w-1/2 hover:bg-red-400 cursor-pointer" onClick={onClose}> Cancel </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-xl w-1/2 hover:bg-blue-600 cursor-pointer" onClick={handleSubmit} disabled={!title || !text}> Add Note </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNotePopup