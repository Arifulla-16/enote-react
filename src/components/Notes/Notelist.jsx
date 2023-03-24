import Note from './Note'

function Notelist(props) {
  // var [noteList,setNoteList] = useState([
  //   {
  //     "id":1,
  //     "title":"Abc",
  //     "text":"Done in the of king",
  //     "tags":["study","done"],
  //     "images":["3","1"]
  //   },
  //   {
  //     "id":2,
  //     "title":"Def",
  //     "text":"Of the record",
  //     "tags":["science","home"],
  //     "images":["4","2"]
  //   },
  //   {
  //     "id":3,
  //     "title":"Ghi",
  //     "text":"Not mine",
  //     "tags":["misc","home"],
  //     "images":["1","2"]
  //   }
  // ]);

  var {view,noteList,setNoteList} = props;

  const tagRemover = (id,delTag)=>{
    var changedNote = noteList.filter((note)=>note.id==id);

    changedNote[0].tags = changedNote[0].tags.filter((tag)=>tag!==delTag);

    var updatedList = noteList.map((note)=>{
      if(note.id!=id){
        return note;
      }
      else{
        return changedNote[0];
      }
    });

    // console.log(updatedList);

    setNoteList(updatedList);

  }

  const noteRemover = (id)=>setNoteList(noteList.filter((note)=>note.id!=id));

  const checkUpdate = (id,idx,cked)=>{
    var newNote = noteList.filter((note)=>note.id==id);
    newNote[0].checkList[parseInt(idx)]=cked;
    var updatedList = noteList.map((note)=>{
      if(note.id==id){
        return newNote[0];
      }
      else{
        return note;
      }
    });
    setNoteList(updatedList);
  }


  return (
    <div className={`noteList ${view==="grid"?"":"listView"}`}>
        {
          noteList.map((note)=>{
            return <Note title={note.title} text={note.text} list={note.list} checkList={note.checkList} id={note.id} tags={note.tags} images={note.images} tagRemover={tagRemover} noteRemover={noteRemover} checkUpdate={checkUpdate}/>
          })
        }
    </div>
  )
}

export default Notelist