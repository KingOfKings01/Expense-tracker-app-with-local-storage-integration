const existingTracks = JSON.parse(localStorage.getItem("Track List")) || [];

DisplayData(existingTracks)

function handleFormSubmit(event) {
  event.preventDefault();

  let amount = event.target.amount.value;
  let description = event.target.description.value;
  let category = event.target.category.value;

   const trackDetails = {
    amount: amount,
    description: description,
    category: category
  };


  existingTracks.push(trackDetails);

  DisplayData(existingTracks);

  setData(existingTracks)
}

function handleFormUpdate(event, id) {
  event.preventDefault();

  let amount = event.target.amount.value;
  let description = event.target.description.value;
  let category = event.target.category.value;

   const updateTrackDetails = {
    amount: amount,
    description: description,
    category: category
  };

  existingTracks[id] = updateTrackDetails

  DisplayData(existingTracks);

  setData(existingTracks)

  const modal = document.getElementById("modal");
  modal.close()
}

function DisplayData(existingTracks) {
  const TrackList = document.getElementById("TrackList");

  let htmlCode = "";

  existingTracks.forEach((track, id) => {
    htmlCode += `
        <tr>
            <th scope="row">${id+1}</th>
            <td>${track.amount}</td>
            <td>${track.description}</td>
            <td>${track.category}</td>
            <td class="d-flex justify-content-evenly">
                <button onclick="editTrack(${id})" class="btn btn-success">Edit</button>
                <button onclick="deleteTrack(${id})" class="btn btn-danger">Delete</button> 
            </td>
        </tr>
`;
  });
  TrackList.innerHTML = htmlCode;
}

function deleteTrack(id) {
    console.log('deleteTrack', id);

    let update = existingTracks.filter((_, i) => i !== id) 
    setData(update)
    DisplayData(update);
}

function editTrack(id) {
    const modal = document.getElementById("modal");
    modal.showModal()

    const Track = existingTracks[id]

    modal.innerHTML = `
    <form onsubmit="handleFormUpdate(event, ${id})">
        <legend>Expense tracker Update</legend>
        <div class="mb-3">
          <label for="expenseAmount" class="form-label">Expense amount</label>
          <input type="number" min="0" id="amount" class="form-control" placeholder="Amount" value="${Track.amount}">
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <input type="text" min="0" id="description" class="form-control" placeholder="Description" value="${Track.description}">
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Category</label>
          <select id="category" class="form-select" >
            <option ${ Track.category == "Movie" ? "selected" : ""} value="Movie">Movie</option>
            <option ${ Track.category == "Car" ? "selected" : ""} value="Car">Car</option>
            <option ${ Track.category == "Food" ? "selected" : ""} value="Food">Food</option>
            <option ${ Track.category == "Games" ? "selected" : ""} value="Games">Games</option>
          </select>
        </div>
        
        <button class="btn btn-primary">Update</button>
     
    </form>
    `
}

function setData(Tracks) {
  localStorage.setItem("Track List", JSON.stringify(Tracks));
}
