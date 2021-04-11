// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function correct(answers) {
  return answers;
}

function wrong(anwers) {
  return answers;
}

var ids = 0;  

$( document ).ready(function() {
  var country_capital_pairs = pairs;
  var capitals = [];
  var answers = [];
  
  for (var i = 0; i < country_capital_pairs.length; i++) {
    capitals.push(country_capital_pairs[i]["capital"]);
  }

  var question_id = random(0, country_capital_pairs.length);
  var country = country_capital_pairs[question_id]["country"];
  
  $ ("#pr2__country").html(country);
  $ ("#pr2__capital").focus();
  $ ("#myTable").append("<tr><td></td><td>The list is empty</td><td></td></tr>");
  $ ("#myTable tr:last").css("text-align", "center");

  $ ("#pr2__capital").keypress(function(event) {
    if (event.which == 13)
      $ ("#pr2__button").click();
  });

  $ ("#pr2__capital").autocomplete({
    minLength: 2,
    source: function(request, response) {
      response ( $.grep(capitals, function(value) {
        value = value.label || value.value || value;
        return value.toLowerCase().startsWith(request.term.toLowerCase());
      }) );
    },
    select: function(event, ui) {
      $ ("#pr2__capital").val(ui.item.value);
      $ ("#pr2__button").click();
      return false;
    },
  });

  $ ("#pr2__button").click(function() {
    var userAnswer = $("#pr2__capital").val();
    console.log(userAnswer);
    if (userAnswer.length != 0) {
      if ($ ("#myTable tr:last").css("text-align") == "center") {
        $ ("#myTable tr:last").remove();
      }

      var realAnswer = country_capital_pairs[question_id]["capital"];
      
      var btn = document.createElement('button');
      btn.innerHTML = 'Remove';
      btn.className = 'remove_btn';
      btn.id = ids;
      ids += 1;

      console.log(' BUTTON ---> ' + btn);

      if (userAnswer.toLowerCase() == realAnswer.toLowerCase()) {
        html = "<tr class=\"correct\"><td>" + country + "</td><td>" + realAnswer + "</td><td><i class=\"fas fa-circle\"></i></td></tr>";
        $ ("#myTable").append(html);
      } else {
        html = "<tr class=\"wrong\"><td>" + country + "</td><td class=\"wrong-line\">" + userAnswer + "</td><td><i>" + realAnswer + "</i></td></tr>";
        $ ("#myTable").append(html);
      }
      
      console.log($ ("#myTable tr:last td:last"));

      btn.onclick = function() {
        console.log(btn.id);
        answers[btn.id] = '';
      
        $("#dropdown").change();
      }

      $ ("#myTable tr:last td:last").append(btn);

      $ ("#myTable tr:last").attr('id', answers.length);
      
      console.log($ ("#myTable tr:last").attr('id'));
      
      answers.push($ ("#myTable tr:last"));
      
      question_id = random(0, country_capital_pairs.length);
      country = country_capital_pairs[question_id]["country"];
      $ ("#pr2__country").html(country);

    }
    $ ("#pr2__capital").val("");
    $ ("#pr2__capital").focus();

    $ ("#dropdown").val("all");
    $ ("#dropdown").change();  
  });

  $ ("#dropdown").change(function(){

    console.log('changing dropdown to ' + $("#dropdown").val());
    while ($ ("#myTable tr:last").attr('id') != 'quiz_input') {
      $ ("#myTable tr:last").remove();
    }

    if ($("#dropdown").val() == "all") {
      for (var i = 0; i < answers.length; i++) {
        if (answers[i].length == 0)
          continue;
        
        $ ("#myTable").append(answers[i]);
        $ ("#myTable tr:last").attr('id', i); 
      }
    } else if ($("#dropdown").val() == "correct") {
      for (var i = 0; i < answers.length; i++) {
        if (answers[i].length == 0)
          continue;
        
          if ($ (answers[i]).attr('class') == "correct") {
          $ ("#myTable").append(answers[i]);
          $ ("#myTable tr:last").attr('id', i);
        }
      }
    } else {
      for (var i = 0; i < answers.length; i++) {
        if (answers[i].length == 0)
          continue;
        
        if ($ (answers[i]).attr('class') == "wrong") {
          $ ("#myTable").append(answers[i]);
          $ ("#myTable tr:last").attr('id', i);
        }
      }
    }
    
    if ($ ("#myTable tr:last").attr('id') == 'quiz_input') {
      $ ("#myTable").append("<tr><td></td><td>The list is empty</td><td></td></tr>");
      $ ("#myTable tr:last").css("text-align", "center");
    }

    $ ("#pr2__capital").focus();
  });
});

