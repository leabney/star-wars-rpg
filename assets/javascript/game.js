$(document).ready(function () {

    var yourCharacter = "";
    var yourHealthPoints;
    var yourInitialAttackPoints;
    var yourAttackPoints=0;
    var yourCard;
    var yourDisplayName;

    var defender = "";
    var defenderHealthPoints;
    var defenderCounterAttackPoints;
    var defenderDisplayName;

    function Character(name, displayName, imgSrc) {
        this.name = name;
        this.displayName = displayName;
        this.type = "character";
        this.healthPoints = Math.round((Math.floor(Math.random() * 70) + 101) / 10) * 10;
        this.attackPoints = Math.floor(Math.random() * 4) + 11;
        this.counterAttackPoints = Math.floor(Math.random() * 14) + 21;
        this.imgSrc = imgSrc;
        this.card =
            '<div class="card img-thumbnail character" id="' + this.name + '">' +
            '<div class="card-block">' +
            '<p class="card-text text-center">' + this.displayName + '</p>' +
            '</div>' +
            '<img class="img-responsive" src="' + this.imgSrc + '" alt="' + this.displayName + '">' +
            '<div class="points">' + this.healthPoints + '</div>' +
            '</div>';
    }

    var obi_wan = new Character("obi_wan", "Obi Wan Kenobi", "assets/images/obi_wan.jpg");
    var luke_skywalker = new Character("luke_skywalker", "Luke Skywalker", "assets/images/luke_skywalker.jpg");
    var darth_sidious = new Character("darth_sidious", "Darth Sidious", "assets/images/darth_sidious.jpg");
    var darth_maul = new Character("darth_maul", "Darth Maul", "assets/images/darth_maul.jpg");

    var characters = { obi_wan, luke_skywalker, darth_sidious, darth_maul };

    $(".characters").html(obi_wan.card + luke_skywalker.card + darth_sidious.card + darth_maul.card);

    $(".card").click(function () {
        if (yourCharacter === "") {
            for (var key in characters) {
                if (characters.hasOwnProperty(key)) {
                    var character = characters[key];

                    if (character.name === $(this).attr("id")) {
                        yourCharacter = $(this).attr("id");
                        yourDisplayName=character.displayName;
                        yourHealthPoints = character.healthPoints;
                        yourInitialAttackPoints = character.attackPoints;
                        $(".yourCharacter").html(character.card);

                        console.log("Your character: " + character.displayName);
                        console.log("Your health points: " + yourHealthPoints);
                        console.log("Your attack points: " + yourInitialAttackPoints);

                        $(this).remove();
                        $(".characters").appendTo($(".enemies"))
                       
                        
                    }
                }
            }
        }


        
        if ($(this).attr("id") !== yourCharacter && defender === "") {

            for (var key in characters) {
                if (characters.hasOwnProperty(key)) {
                    var character = characters[key];

                    if (character.name === $(this).attr("id")) {
                        defender = $(this).attr("id");
                        defenderDisplayName = character.displayName;
                        defenderHealthPoints = character.healthPoints;
                        defenderCounterAttackPoints = character.counterAttackPoints;
                        $(".defender").html(character.card);


                        console.log("Defender: " + character.displayName);
                        console.log("Defender health points: " + defenderHealthPoints);
                        console.log("Defender attack points: " + defenderCounterAttackPoints);

                        $(this).remove();
                    }
                }
            }
        }
    });
    
    $(".btn").click(function(){
        if (yourCharacter !="" && defender !=""){

            if (yourHealthPoints > 0 && defenderHealthPoints>0){
            
            yourAttackPoints = yourAttackPoints + yourInitialAttackPoints;
            yourHealthPoints=yourHealthPoints-defenderCounterAttackPoints;


            defenderHealthPoints=defenderHealthPoints-yourAttackPoints;
            $(".yourCharacter").find(".points").html(yourHealthPoints);
            $(".defender").find(".points").html(defenderHealthPoints);
            $(".attackMessage").html("You attacked " + defenderDisplayName + " for "  + yourAttackPoints + " points. <br> " + defenderDisplayName + " attacked you for " + defenderCounterAttackPoints + " points.");

        }

            if(yourHealthPoints <1) {
                $(".attackMessage").html("You have been killed by " + defenderDisplayName +".");
            }

            if (defenderHealthPoints < 1) {
                $(".attackMessage").html("You defeated "+ defenderDisplayName + ".");
                $(".defender").html("");
                defender="";
             

            }
        
    
    }



});

});