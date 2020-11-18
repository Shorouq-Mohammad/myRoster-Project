const render = new Renderer();
const getRoster = function () {
  const name = $("#team").val();
  $.get(`teams/${name}`, function (data) {
    render.render(data);
  });
};

//to show the player stats
$("#players").on("click", ".imgDiv", function () {
  if ($(this).find(".stats").text() === "") {
    const name = $(this).parent().find(".name").text();
    $.get(`playerStats/${name}`, (data) => {
      render.renderStats(data, $(this));
    });
  } else {
    $(this).find(".stats").toggle();
  }
});

const dreamTeam = function () {
  $.get("/dreamTeam", function (data) {  
    render.renderDreamTeam(data);
  });
};

//to add a player to dream team
$("#players").on("click", ".fa-star", function () {
  const name = $(this).closest(".player").find(".name").text().split(" ");
  const data = { firstName: name[0], lastName: name[1] };
  $.post("/roster", data, response => {
    if (!response == "") {
      alert(response);
    }else{
      $(this).attr("class", "fas fa-star");
    }
  });
});

//to remove the player from the dream team
$("#players").on("click", ".fa-trash-alt", function(){
  const name = $(this).closest(".player").find(".name").text();
  $.ajax({
    method: "DELETE",
    url: "/dreamTeam/"+name,
    success: function(data){
      render.renderDreamTeam(data)
    }
  });
});