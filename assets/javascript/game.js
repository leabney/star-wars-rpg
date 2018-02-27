$(document).ready(function () {

    var character = [];
    var numberCharacters = $(".character").length;
    var yourCharacter = "";
    var yourCharacterHTML;
    var yourAttackPower;

    var enemies;
    var enemiesHTML;
    var defender = "";
    var defenderAttackPower;


    for (var i = 0; i < numberCharacters; i++) {
        character[i] = {
            name: $(".character:eq(" + i + ")").attr("id"),
            type: "character",           
            healthPoints: Math.round((Math.floor(Math.random() * 70) + 101)/10)*10,
            attackPower: Math.floor(Math.random() * 4) + 1,
            counterAttackPower: Math.floor(Math.random() * 14) + 11
        };

        $(".character:eq(" + i + ")").find(".points").html(character[i].healthPoints)
        yourAttackPower = character[i].attackPower;

    };
    
    if (yourCharacter === "") {
        $(".card").click(function () {
            yourCharacterHTML = '<div class="card img-thumbnail" id="yourCharacter">' + $(this).html();
            yourCharacter = $(this).attr("id");
            console.log("Your Character: " + yourCharacter);

            $(this).remove();
            $(".enemies").html($(".characters").html());
            $(".characters").remove();

            $(".yourCharacter").html(yourCharacterHTML);
            for (var i = 0; i < numberCharacters; i++) {
                if (character[i].name === $(this).attr("id")) {
                    character[i].type = "yourCharacter";
                    console.log(yourCharacterHTML);
                }
                else {
                    character[i].type = "enemy";
                    if (defender === "") {
                        $(".card").click(function () {
                            defenderHTML = '<div class="card img-thumbnail" id="defender">' + $(this).html();
                            defender = $(this).attr("id");
                            console.log("Defender: " + defender);
                            
                            $(this).remove();
                            $(".defender").html(defenderHTML);


                            $(".yourCharacter").html(yourCharacterHTML);
                            for (var i = 0; i < numberCharacters; i++) {
                                if (character[i].name === $(this).attr("id")) {
                                    character[i].type = "defender";
                                    console.log(defender);
                                    defenderAttackPower=character[i].counterAttackPower;
                                }
                                else {
                                    character[i].type = "enemy";


                                };
                            };

                        });
                    }

                };
            };

        });

    };

    $(".btn").click(function(){
        if (yourCharacter !="" && defender !=""){
            $(".attackMessage").html(("You attacked "+ defender.replace("_"," ") + " for " + yourAttackPower + " damage points. <br>" + defender.replace("_"," ") + " attacked you for " + defenderAttackPower + " damage points." ).toUpperCase());
            alert(yourCharacterHTML);
        }
        else {
           alert("Please select your character and a defender before attacking.");
        }
    });


    //check//
    console.log(character);
});



