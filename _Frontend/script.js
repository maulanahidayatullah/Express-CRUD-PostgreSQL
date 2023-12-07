const url = "http://localhost:3000/";

$(document).ready(function () {
    getData();
});

function getData() {
    $.ajax({
        method: 'GET',
        url: url,
        success: function (response) {
            buildTable(response.payload)
        }
    })
}

function buildTable(data) {
    let row = [];
    for (let i = 0; i < data.length; i++) {
        row += `
        <tr>
            <td>${i + 1}</td>
            <td>${data[i].PackageName}</td>
            <td>${data[i].ArtistName}</td>
            <td>${formatDate(data[i].ReleaseDate)}</td>
            <td><a href="${data[i].SampleURL}">Play</a></td>
            <td>
                <div onclick="edit(event)" 
                data-id='${data[i].id}'
                data-PackageName='${data[i].PackageName}'
                data-ArtistName='${data[i].ArtistName}'
                data-ReleaseDate='${data[i].ReleaseDate}'
                data-SampleURL='${data[i].SampleURL}' 
                data-ImageURL='${data[i].ImageURL}' 
                class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editModal" >Edit</div>
                
                <div onclick="destroy(event)"
                data-id='${data[i].id}'
                class="btn btn-danger" >Delete</div>
            </td>
        </tr>
        `;
        $("#bodyTable").html(row)
    }
}

function edit(ev) {
    ev.preventDefault();
    var id = ev.currentTarget.getAttribute("data-id");
    var PackageName = ev.currentTarget.getAttribute("data-PackageName");
    var ArtistName = ev.currentTarget.getAttribute("data-ArtistName");
    var ReleaseDate = ev.currentTarget.getAttribute("data-ReleaseDate");
    var SampleURL = ev.currentTarget.getAttribute("data-SampleURL");
    var ImageURL = ev.currentTarget.getAttribute("data-ImageURL");


    $("#data_id").val(id);
    $("#edit_package_name").val(PackageName);
    $("#edit_artist_name").val(ArtistName);
    $("#edit_date_release").val(valDate);
    $("#edit_sample_url").val(SampleURL);
    $("#edit_image_url").val(ImageURL);
}

function formatDate(date) {
    var date = new Date(date);

    var day = date.getUTCDate();
    var month = date.getUTCMonth() + 1;
    var year = date.getUTCFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    var formattedDate = day + '-' + month + '-' + year;

    return formattedDate;
}

function valDate() {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    return today;
}

$("#btnAdd").click(function (params) {
    artistName = $('#artist_name').val();
    packageName = $('#package_name').val();
    imageUrl = $('#sample_url').val();
    releaseDate = $('#date_release').val();
    sampleUrl = $('#sample_url').val();

    const data = { artistName, packageName, imageUrl, releaseDate, sampleUrl };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'store', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log('Server response:', response);
        }
    };
    xhr.send(JSON.stringify(data));
    Swal.fire({
        title: "Created!",
        text: "Your file has been Created.",
        icon: "success"
    });
});

$("#btnUpdate").click(function (params) {
    id = $('#data_id').val();
    artistName = $('#edit_artist_name').val();
    packageName = $('#edit_package_name').val();
    imageUrl = $('#edit_sample_url').val();
    releaseDate = $('#edit_date_release').val();
    sampleUrl = $('#edit_sample_url').val();

    const data = { id, artistName, packageName, imageUrl, releaseDate, sampleUrl };

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url + 'update', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log('Server response:', response);
        }
    };
    xhr.send(JSON.stringify(data));
    Swal.fire({
        title: "Updated!",
        text: "Your data has been Updated.",
        icon: "success"
    }).then(function () {
        setTimeout(getData(), 1000);
    });

    // setTimeout(location.reload(), 2000);
});

function destroy(ev) {
    ev.preventDefault();
    var id = ev.currentTarget.getAttribute("data-id");

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            const data = { id };

            const xhr = new XMLHttpRequest();
            xhr.open('DELETE', url + 'delete', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    console.log('Server response:', response);
                }
            };
            xhr.send(JSON.stringify(data));
            Swal.fire({
                title: "Deleted!",
                text: "Your data has been deleted.",
                icon: "success"
            });
            setTimeout(location.reload(), 2000);
        }
    });

}