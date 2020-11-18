class Renderer {
  constructor() {}
  render(data) {
    const source = $("#players-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template({ players: data });
    $("#players").empty();
    $("#team").val("")
    $("#players").append(newHTML);
  }
  renderStats(stat, $imgDiv){
    const entries = Object.entries(stat);
    const source = $("#stats-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template({ stats: entries });
    $imgDiv.children(".stats").empty();
    $imgDiv.children(".stats").append(newHTML);
  }
  renderDreamTeam(data){
    data.map((d) => {
      d.dreamTeam = true;
      return d;
    });
    this.render(data)
  }
}
