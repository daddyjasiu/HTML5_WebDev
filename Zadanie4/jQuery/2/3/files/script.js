//The first player
let player1 = {
    mark: 'X',
    name: 'Player 1',
    style: 'player1_cell',
    score_el: 'player1_wins',
    wins: 0
};

// The second player
let player2 = {
    mark: 'O',
    name: 'Player 2',
    style: 'player2_cell',
    score_el: 'player2_wins',
    wins: 0
};
let players = [player1, player2];
let current_player = 0;
const num_of_cols = 3;
const num_of_rows = 3;
let cells_marked = 0;
let max_cells_marked = num_of_cols*num_of_rows;

function playMove() {
    $(this).addClass(players[current_player].style)
        .addClass("marked")
        .text(players[current_player].mark)
        .trigger("mouseout")
        .off("click mouseover mouseout");
//sprawdzenie czy nie nastąpił koniec gry

    checkAndProcessWin()

    return false;
}

function hoverCell() {
    $(this).addClass('hover');
}

function leaveCell() {
    $(this).removeClass('hover');
}

function initTurn(){
    $("#player_name").text(players[current_player].name);
    $("#player_mark").text(players[current_player].mark);
    $("#player_1_score").text(player1.wins);
    $("#player_2_score").text(player2.wins);
}

function checkAndProcessWin() {

    if (!ifPlayerWon()) {
        current_player = (++current_player) % players.length;
        cells_marked++;

        if(cells_marked === max_cells_marked){
            alert("Remis!");
            current_player = 0;
            cells_marked = 0;
            restart();
        }

        initTurn();
    } else {
        alert("Koniec gry!\nZwycięzca: " + players[current_player].name);
        players[current_player].wins++;
        current_player = 0;
        cells_marked = 0;
        restart();
    }

    function ifPlayerWon(){
        const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
            [2, 5, 8], [0, 4, 8], [6, 4, 2]];

        let pattern;
        for (let k in wins) {
            pattern = wins[k];
            let p = $("#" + pattern[0]).text()
                + $("#" + pattern[1]).text()
                + $("#" + pattern[2]).text();
            if (p === "XXX") return true;
            if (p === "OOO") return true;
        }
        return false;
    }
}

function restart() {

    $("#game_map").empty();

    for(let i=0; i<num_of_cols*num_of_rows;++i)
    {
        let cell = $("<div></div>")
            .addClass("cell")
            .appendTo("#game_map")
            .attr("id", i);
        if ( i % num_of_cols === 0 ){
            cell.before('<div class="clear"></div>');
        }
    }

    $("#game_map .cell")
        .on("click", playMove)
        .on('mouseover', hoverCell)
        .on('mouseout', leaveCell);
    initTurn();
}

$(document).ready(restart);
   