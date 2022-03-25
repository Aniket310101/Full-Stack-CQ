
var submitQuestionNode = document.querySelector("#submitBtn")
var questionTitleNode = document.querySelector("#subject")
var questionDescriptionNode = document.querySelector("#question")
var allQuestionsListNode = document.querySelector("#dataList");
var createQuestionFormNode = document.querySelector("#toggleDisplay");
var questionDetailContainerNode = document.querySelector("#respondQue")
var resolveQuestionContainerNode = document.querySelector("#resolveHolder");
var resolveQuestionNode = document.querySelector("#resolveQuestion");
var responseContainerNode = document.querySelector("#respondAns");
var commentContainerNode = document.querySelector("#commentHolder");
var commentatorNameNode = document.querySelector("#pickName");
var commentNode = document.querySelector("#pickComment");
var submitCommentNode = document.querySelector("#commentBtn");
var questionSearchNode = document.querySelector("#questionSearch");
var upvote = document.querySelector("#upvote");
var downvote = document.querySelector("#downvote");
var newFormBtn = document.querySelector("#newQuestionForm")

newFormBtn.addEventListener("click", displayNewQuestionPanel);


function reloadpage(){
    // location.reload();
    createQuestionFormNode.style.display = "block";
}



questionSearchNode.addEventListener("input",function(event){
   
    filterResult(event.target.value);
})


function filterResult(query){

    var allQuestions = getAllQuestions();
    if(query){

        clearQuestionPanel();
        
        var filteredQuestions = allQuestions.filter(function(question){
            if(question.title.includes(query)){
                return true;
            }
        });

        if(filteredQuestions.length){
            filteredQuestions.forEach(function(question){
                addQuestionToPanel(question);
            })
        }
        else{
            printNoMatchFound();
        }
    }

    else{
        clearQuestionPanel();
        allQuestions.forEach(function(question){
            addQuestionToPanel(question);  
        });
    }

}

function clearQuestionPanel(){
    allQuestionsListNode.innerHTML = "";
}


function onLoad(){

    var allQuestions = getAllQuestions();

    allQuestions = allQuestions.sort(function(currentQn, nextQn){
        if(currentQn.isFav){
            return -1;
        }
        return 1;
    })

    allQuestions.forEach(function(question){
        addQuestionToPanel(question);
    })
}

onLoad();


submitQuestionNode.addEventListener("click", onQuestionSubmit);

function onQuestionSubmit(){

    // console.log(questionDescriptionNode.value);
    var question = {
        title: questionTitleNode.value,
        description : questionDescriptionNode.value,
        responses: [],
        upvotes: 0,
        downvotes: 0,
        createdAt: Date.now(),
        isFav: false
    }

    saveQuestion(question);
    addQuestionToPanel(question);
}


function saveQuestion(question){

    var allQuestions = getAllQuestions();

    allQuestions.push(question);
    localStorage.setItem("questions", JSON.stringify(allQuestions));

}


function getAllQuestions(){
    var allQuestions = localStorage.getItem("questions");

    if(allQuestions){
        allQuestions = JSON.parse(allQuestions);
    }
    else{
        allQuestions = [];
    }

    return allQuestions;
}


function addQuestionToPanel(question){

    var questionContainer = document.createElement("div");
    questionContainer.classList.add("zoom");
    questionContainer.setAttribute("id", question.title);
    // questionContainer.style.background = "grey";

    var newQuestionTitleNode = document.createElement("h4");
    newQuestionTitleNode.innerHTML = question.title;
    questionContainer.appendChild(newQuestionTitleNode);

    var newQuestionDescriptionNode = document.createElement("p");
    newQuestionDescriptionNode.innerHTML = question.description;
    questionContainer.appendChild(newQuestionDescriptionNode);

    var upvoteTextNode = document.createElement("h4");
    upvoteTextNode.innerHTML = "Upvote : "+ question.upvotes;
    questionContainer.appendChild(upvoteTextNode);

    var downvoteTextNode = document.createElement("h4");
    downvoteTextNode.innerHTML = "Downvote : "+question.downvotes;
    questionContainer.appendChild(downvoteTextNode);

    var creationDateAndTimeNode = document.createElement("p");
    var today  = new Date();
    creationDateAndTimeNode.innerHTML = new Date(question.createdAt).toLocaleString();
    questionContainer.appendChild(creationDateAndTimeNode);

    var createAtNode = document.createElement("p");
    // createAtNode.innerHTML = "Created: "+convertDateToCreatedAtTime(question.createdAt, createAtNode)+" ago";
    questionContainer.appendChild(createAtNode);
    setInterval(function(){
        createAtNode.innerHTML = "Created: "+convertDateToCreatedAtTime(question.createdAt)+" ago";
    }, 1000);

    var addFavBtn = document.createElement("button");
    if(question.isFav){
        addFavBtn.innerHTML = "Remove";
    }
    else{
        addFavBtn.innerHTML = "Favorite";
    }
    questionContainer.appendChild(addFavBtn);
    addFavBtn.addEventListener("click", toggleFavQuestion(question));


    var line = document.createElement("hr");
    questionContainer.appendChild(line);

    allQuestionsListNode.appendChild(questionContainer);

    questionContainer.addEventListener("click", onQuestionClick(question));


}

function toggleFavQuestion(question){
    return function(event){

        question.isFav = !question.isFav;
        updateQuestion(question);
        if(question.isFav){
            event.target.innerHTML = "Remove";
        }
        else{
            event.target.innerHTML = "Favorite";
        }

    }
}

function convertDateToCreatedAtTime(date){

    var currentTime = Date.now();
    var timeLapsed = currentTime - new Date(date).getTime();
    var secondsDiff = parseInt(timeLapsed/1000);
    var minutesDiff = parseInt (secondsDiff / 60);
    var hourDiff = parseInt(minutesDiff / 60);

    if(hourDiff)
        return hourDiff+" hours";
    else if(minutesDiff)
        return minutesDiff+" minutes";
    else
        return secondsDiff+" seconds";
    
    // return hourDiff+" hours "+ minutesDiff +" minutes "+secondsDiff+" seconds";
}



function onQuestionClick(question){
    return function(){
        hideQuestionPanel();

        clearQuestionDetails();

        clearResponsePanel();

        showDetails();

        addQuestionToRight(question);

        question.responses.forEach(function(response){
            addResponseInPanel(response);
        })

        submitCommentNode.onclick = onResponseSubmit(question);  //used onClick instead of addEventListener. See the lecture.
        upvote.onclick = upvoteQuestion(question);
        downvote.onclick = downvoteQuestion(question);
        resolveQuestionNode.onclick = resolveQuestion(question);
        
    }
}


function upvoteQuestion(question){
    return function(){
        question.upvotes++;
        updateQuestion(question);
        updateQuestionUI(question);
    }
    
}

function downvoteQuestion(question){
    return function(){
        question.downvotes++
        updateQuestion(question);
        updateQuestionUI(question);
    }
}


function resolveQuestion(removeQuestion){
    return function(){
        var questionBlock=document.getElementById(removeQuestion.title);
        // console.log(que);
        allQuestionsListNode.removeChild(questionBlock);
        var allQuestions = getAllQuestions();
        allQuestions.filter(function(question){
            if(removeQuestion.title === question.title){
                // localStorage.removeItem(question, JSON.stringify(question));
                var index = allQuestions.indexOf(question);
                allQuestions.splice(index,1);
                // console.log(question);
            }
            // return question;
        })
        localStorage.setItem("questions",JSON.stringify(allQuestions));
        displayNewQuestionPanel();
        // console.log(allQuestions);
    }
    

}


function updateQuestionUI(question){
    var questionContainerNode = document.getElementById(question.title);

    questionContainerNode.childNodes[2].innerHTML = "Upvote : "+question.upvotes;
    questionContainerNode.childNodes[3].innerHTML = "Downvote : "+question.downvotes;

}


function onResponseSubmit(question){

    return function(){

        var response = {
            name: commentatorNameNode.value,
            description: commentNode.value,
            createTime: Date.now()
        }
        saveResponse(question, response);
        addResponseInPanel(response);
    }
}


function addResponseInPanel(response){
    
    var container = document.createElement("div");

    var userNameNode = document.createElement("h4");
    userNameNode.innerHTML = response.name;
    container.appendChild(userNameNode);

    var userCommentNode = document.createElement("p");
    userCommentNode.innerHTML = response.description;
    container.appendChild(userCommentNode);

    var createTimeNode = document.createElement("p");
    container.appendChild(createTimeNode);

    setInterval(function(){
        createTimeNode.innerHTML = "Created: "+convertDateToCreatedAtTime(response.createTime)+" ago";
    },1000)

    var line = document.createElement("hr");
    container.appendChild(line);

    responseContainerNode.appendChild(container);

}


function hideQuestionPanel(){
    createQuestionFormNode.style.display = "none";
}


function showDetails(){
    questionDetailContainerNode.style.display = "block";
    resolveQuestionContainerNode.style.display = "block";
    responseContainerNode.style.display = "block";
    commentContainerNode.style.display = "block";

}


function addQuestionToRight(question){
    var titleNode = document.createElement("h3");
    titleNode.innerHTML = question.title;

    var descriptionNode = document.createElement("p");
    descriptionNode.innerHTML = question.description;

    questionDetailContainerNode.appendChild(titleNode);
    questionDetailContainerNode.appendChild(descriptionNode);
}


function updateQuestion(updatedQuestion){
    var allQuestions = getAllQuestions()
    var revisedQuestions = allQuestions.map(function(question){
        if(updatedQuestion.title === question.title){
            return updatedQuestion;
        }

        return question;
    })

    localStorage.setItem("questions", JSON.stringify(revisedQuestions));
}

//
function saveResponse(updatedQuestion, response){
    var allQuestions = getAllQuestions();

    var revisedQuestions = allQuestions.map(function(question){
        if(updatedQuestion.title === question.title){
            question.responses.push(response);
        }

        return question;
    })

    localStorage.setItem("questions", JSON.stringify(revisedQuestions));
}


function clearQuestionDetails(){
    questionDetailContainerNode.innerHTML = "";
}

function clearResponsePanel(){
    responseContainerNode.innerHTML = "";
}

function printNoMatchFound(){
    var title = document.createElement("h1");
    title.innerHTML = "NO MATCH FOUND";

    allQuestionsListNode.appendChild(title);
}


function displayNewQuestionPanel(){
    // location.reload();
    console.log("hello");
    questionDetailContainerNode.style.display = "none";
    resolveQuestionContainerNode.style.display = "none";
    responseContainerNode.style.display = "none";
    commentContainerNode.style.display = "none";
    createQuestionFormNode.style.display = "block";
}