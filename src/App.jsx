import { useState, useEffect } from 'react';
import './style/style.css';
import { Button, Textarea, Label, TextInput, Modal } from 'flowbite-react';

function App() {
  const [curhatans, setCurhatans] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const [author, setAuthor] = useState('')
  const [curhatan, setCurhatan] = useState('')
  const props = { openModal, setOpenModal };
  const DOMAIN = "https://go-fly-production.up.railway.app"

  const getAllCurhatan = () => {
    fetch(DOMAIN + '/notes', {
      method: "GET"
    })
      .then(res => { return res.json() })
      .then(data => {
        if (data.meta.status === 200) {
          setCurhatans(data.data)
          setIsCreated(false)
        }
      })
  }

  const postCurhatan = (e) => {
    e.preventDefault()

    const payload = {
      author: author,
      note : curhatan,
    }

    fetch(DOMAIN + '/note/create', {
      method: "POST",
      body:JSON.stringify(payload)
    })
      .then(res => { return res.json() })
      .then(data => {
        if (data.meta.status === 200) {
          setIsCreated(true)
          setOpenModal(false)
        }
      })
  }


  useEffect(() => {
    getAllCurhatan()
  }, [isCreated])

  return (
    <>
      <div className="curhatans px-5 py-5 md:px-24 lg:px-80">
        <div className="content flex flex-col gap-5">
          {curhatans && curhatans.map((curhatan) => (
            <div className="card rouded text-white bg-secondary px-3 py-6 rounded-md flex flex-col gap-3">
              <div className="author font-bold tracking-wider">
                <div className="flex items-center gap-1">
                  <div className="author-name text-sm text-dark">
                    {curhatan.author}
                  </div>
                  <div className="icon text-sm flex text-accent">
                    <ion-icon name="checkmark-circle"></ion-icon>
                  </div>
                </div>
              </div>

              <div className="curhat text-sm text-dark">
                {curhatan.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="button-add-note fixed bottom-5 right-5 md:right-24 lg:right-80">
        <button onClick={() => props.setOpenModal('dismissible')} className='rounded-full bg-accent hover:bg-blue-600 p-3' >
          <div className="icon text-2xl font-extrabold text-white flex">
            <ion-icon name="add-outline"></ion-icon>
          </div>
        </button>
        <Modal
          dismissible
          show={props.openModal === 'dismissible'}
          onClose={() => props.setOpenModal(undefined)}
          className='h-screen'
        >
          <Modal.Header>Curhatan-ku</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <form className="flex flex-col gap-6" onSubmit={postCurhatan}>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="nama"
                      value="Nama Kamu"
                    />
                  </div>
                  <TextInput
                    id="nama"
                    placeholder="namaku rahasia"
                    type="text"
                    helperText={'tidak wajib'}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="curatan"
                      value="Curhatan"
                    />
                  </div>
                  <Textarea
                    id="curatan"
                    placeholder='saya hari ini....'
                    required
                    rows={5}
                    onChange={(e)=> setCurhatan(e.target.value)}
                  />
                </div>
                <button type="submit" className='bg-accent hover:bg-blue-600 text-white p-2 py-3 rounded-lg font-semibold'>
                  Kirim
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default App;
