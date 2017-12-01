 $.getJSON('quizs.json')
.done(function (data) {
    var array = new Array();
    var k = 0;
    var html = '';
    myList = data;
    for (var i = 0; i < myList.length; i++) {
        html += "<p class='question' >" + (i+1) + "." + myList[i].question + "</p>";

        var list = myList[i].answers
        html += "<div class='answers' id = '" + myList[i].id + "'>";
        for (var j = 0; j < list.length; j++) {
            html += "<input type='radio' name='answer-" + i + "' class='answer'  value='" + j + "'><span>" + list[j] + "</span><br>";
        }
        html += "</div>";
    }
    $('#quiz-content').html(html);

    $(document).on('click', '.answer', function() {
        var value = parseInt($(this).val());
        var id = $(this).parent().attr('id');
        var answer = $(this).parent().attr('id') - 1;                    
        var answer_correcrs = {"id": '', "answer": ''};
        
        correct_answer = myList[answer].correct_answer;
        if (value == correct_answer) {
            if (array.length == 0) {
               answer_correcrs.id =  id;
               answer_correcrs.answer = correct_answer;
               array.push(answer_correcrs);
            } else {
               for (var q = 0; q < array.length; q++) {
                    if (id != array[q]['id']) {
                        answer_correcrs.id =  id;
                        answer_correcrs.answer = correct_answer;
                        array.push(answer_correcrs);
                     break;
                  }
               }   
            }
        } else {
            for (var q = 0; q < array.length; q++) {
                if (id == array[q]['id'] ) {
                    array.splice(q, 1);
                }
            }   
        }
    });

   $(document).on('click', '#submit', function() {
        if (!confirm('Do you want to finish this Yours_Test!')) return;
        for(var i = 0; i < myList.length; i++) {
            $('#' + (i+1)).find("input[value='"+ myList[i].correct_answer +"']").next('span').addClass('correct_answers');
        }
    })
});
