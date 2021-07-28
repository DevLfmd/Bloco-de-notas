import React from 'react';
import { useAxios } from './hooks/useAxios';
import './App.css';

interface Note {
  _id: number;
  subject: string;
  text: string;
};

export default function App() {
  const { axios } = useAxios();
  const initialState = { _id: 0, subject: '', text: '' };
  const [notes, setNotes] = React.useState<Array<Note>>([]);
  const [note, setNote] = React.useState<Note>(initialState);
  

  /**
   * Envia dados para o backend
   */
  const onSubmit = async () => { 
    await axios.post('/notas/criar', { note }); 
    setNote(initialState);
  };

  /**
   * Exclui uma nota
   */
  const onDestroy = async (_id: number) => {
    await axios.delete(`/notas/excluir/${_id}`);

    setNotes(
      notes?.filter((item: Note) => item._id !== _id)
    );
  };

  React.useEffect(() => {
    (async () => (
      await axios.get('/notas').then((res) => setNotes(res.data.notes))
    ))();
  }, [axios])

  return (
    <div className="container">
      <div className="form">
        <h1 style={{ color: '#93469c' }}> Bloco de notas </h1>
        <input 
          placeholder="Assunto" 
          className="input" 
          type="text" 
          onChange={(e) => setNote({ ...note, subject: e.target.value })}
          value={note.subject}
        />
        <textarea 
          placeholder="Texto" 
          rows={10} 
          className="textArea"
          onChange={(e) => setNote({ ...note, text: e.target.value })}
          value={note.text}
        ></textarea>
        <button onClick={onSubmit} className="btn">CRIAR NOTA</button>
      </div>
      <div className="notes">
        <h1 style={{ color: '#93469c' }}> Suas notas </h1>
        <div className="card-notes">
          {notes.length > 0 ? (
            notes?.map(({ _id, subject, text }: Note) => (
              <div key={_id} className="card">
                <div className="card-header">
                  <label className="color-primary">{subject}</label>
                  <div 
                    className="card-delete" 
                    onClick={() => onDestroy(_id)}
                  >&times;</div>
                </div>
                <hr className="border-dashed" />
                <div className="card-body">{text}</div>
              </div>
            ))
          ) : (
            <div className="card">
              <div className="card-header">
                <label className="color-primary">No momento não há cartões para listar.</label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};