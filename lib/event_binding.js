$(document).ready(function () {
    
    var game = new Sudoku.Game();
    renderInitialBoard(game.initialBoard);
    
    $selectorElements = $('ul.clearfix.selector');
    $boardElements = $('ul.clearfix.board');
    
    $selectorElements.on('click', 'li', function (event) {
        $('ul.clearfix.selector li').removeClass('highlight');
        $(event.currentTarget).addClass('highlight');
        
        var selectedNumber; 
        try {
            selectedNumber = eval($(this).attr('id'));
        } catch (e) { 
            // selectedNumber remains undefined;
        }
        
        game.setSelectedNumber(selectedNumber);
    });
    
    $boardElements.on('click', 'li', function (event) {
        
        var coordKey = $(event.currentTarget).attr('id').slice(1, -1);

        if ( game.initialBoard[coordKey] ) {
            return;
        }
        
        var coord = eval($(this).attr('id'));
        var num = game.selectedNumber;
        
        if ( !num ) {
            $(event.currentTarget).html('');
            game.placeNumber(coord);
        } else if ( game.isValid(coord, num) ) {
            $(event.currentTarget).html(num);
            game.placeNumber(coord);
        } else {
            showXOver($(event.currentTarget));
        }

    });
    
    function renderInitialBoard(boardObject) {
        var init = boardObject;
        
        for (var key in init) {
            if ( init.hasOwnProperty(key)) {
                var idString = '[id="[' + key + ']"]';
                var $el = $(idString);
                $el.html(init[key]);
                $el.addClass("initial-board");
            }
        }
    };
    
    function showXOver($el) {
        
        $spanX = $('<span>&times</span>');
        $el.append($spanX);
        
        $spanX.fadeOut(750, function (){
            this.remove();
        })
    }
    
});