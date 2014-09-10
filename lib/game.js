(function(root) {
    
    var Sudoku = root.Sudoku = (root.Sudoku || {});

    var GROUPS = Sudoku.GROUPS = {
        
        0: [[0,0], [0,1], [0,2], 
            [1,0], [1,1], [1,2],
            [2,0], [2,1], [2,2]],
        
        1: [[0,3], [0,4], [0,5], 
            [1,3], [1,4], [1,5],
            [2,3], [2,4], [2,5]], 
        
        2: [[0,6], [0,7], [0,8], 
            [1,6], [1,7], [1,8],
            [2,6], [2,7], [2,8]],
            
        3: [[3,0], [3,1], [3,2], 
            [4,0], [4,1], [4,2],
            [5,0], [5,1], [5,2]],
            
        4: [[3,3], [3,4], [3,5], 
            [4,3], [4,4], [4,5],
            [5,3], [5,4], [5,5]], 
            
        5: [[3,6], [3,7], [3,8], 
            [4,6], [4,7], [4,8],
            [5,6], [5,7], [5,8]],
            
        6: [[6,0], [6,1], [6,2], 
            [7,0], [7,1], [7,2],
            [8,0], [8,1], [8,2]],
            
        7: [[6,3], [6,4], [6,5], 
            [7,3], [7,4], [7,5],
            [8,3], [8,4], [8,5]], 
            
        8: [[6,6], [6,7], [6,8], 
            [7,6], [7,7], [7,8],
            [8,6], [8,7], [8,8]]
            
    }
    
    var GROUP_MAPPER = Sudoku.GROUP_MAPPER = [
         "0,0", "0,1","0,2",
         "1,0", "1,1","1,2",
         "2,0", "2,1","2,2"
    ]
    
    var initialBoard = Sudoku.initialBoard = {
        "0,0": 5, 
        "0,1": 3, 
        "0,4": 7, 
        "1,0": 6, 
        "1,3": 1, 
        "1,4": 9, 
        "1,5": 5, 
        "2,1": 9, 
        "2,2": 8, 
        "2,7": 6,
               
        "3,0": 8, 
        "3,4": 6, 
        "3,8": 3, 
        "4,0": 4, 
        "4,3": 8, 
        "4,5": 3, 
        "4,8": 1, 
        "5,0": 7, 
        "5,4": 2, 
        "5,8": 6,
               
        "6,1": 6, 
        "6,6": 2, 
        "6,7": 8,                
        "7,3": 4, 
        "7,4": 1, 
        "7,5": 9, 
        "7,8": 5, 
        "8,4": 8, 
        "8,7": 7, 
        "8,8": 9
    }
    
    var Game = Sudoku.Game = function () {
       this.selectedNumber = undefined;
       this.board = constructBoard();
       this.initialBoard = initialBoard;
    }

    var constructBoard = Game.constructBoard = function constructBoard() {

        // Times returns an array of its return values;
         return _.times(9, function (i) {
           return _.times(9, function (j) {
               var coordinateKey = [i, j].toString();
               return ( initialBoard[coordinateKey] )
           });
         });
    };
    
    var findGroupNumber = Game.findGroupNumber = function findGroupNumber(pos) {
        
        // Assuming group 0 is at the top left-hand corner and group 8 is at the bottom right-hand corner;
        // The groupKey's index in the groupMapper array will correspond to its group number;
        
        var groupKey = [Math.floor(pos[0] / 3), Math.floor(pos[1] / 3)];
        var groupKeyString = groupKey.toString();
        return GROUP_MAPPER.indexOf(groupKeyString);
    };
    
    Game.prototype.isWon = function () {
        var flattenedArray = _.chain(this.board)
            .flatten()
            .compact()
            .value();
        
        return flattenedArray.length === 81;
    }
    
    Game.prototype.setSelectedNumber = function (num) {
        this.selectedNumber = num;
    }

    Game.prototype.getValue = function (pos) {
        return this.board[pos[0]][pos[1]];
    };
    
    Game.prototype.placeNumber = function (pos) {
        this.board[pos[0]][pos[1]] = this.selectedNumber;

        if ( this.isWon() ) {
          alert('You did it!');
        }
    };
    
    Game.prototype.checkColumn = function (pos, num) {

        var self = this;
        var i = pos[0];
        var columnValues = _.times(9, function (j) {
            return self.board[i][j];
        });
        
        return (columnValues.indexOf(num) === -1);
    };
    
    Game.prototype.checkRow = function (pos, num) {

        var self = this;
        var j = pos[1];
        var rowValues = _.times(9, function (i) {
            return self.board[i][j];
        });
        
        return (rowValues.indexOf(num) === -1);
    };
    
    Game.prototype.checkGroup = function (pos, num) {

        var self = this;
        var groupNumber = findGroupNumber(pos);
        var coordinates = GROUPS[groupNumber];
        var groupValues = [];
        
        coordinates.forEach(function (coord) {
            groupValues.push(self.getValue(coord));
        })
        
        return (groupValues.indexOf(num) === -1);
    };
    
    Game.prototype.isValid = function (pos, num) {
        
        if ( this.checkRow(pos, num) && this.checkColumn(pos, num) && this.checkGroup(pos, num) ) {
            return true;
        }
        return false;
    };
    
    
})(this);