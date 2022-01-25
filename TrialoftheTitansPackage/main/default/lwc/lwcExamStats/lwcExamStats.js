/*
    Author: Zabian Threatt
    Description: lcmExamStats helps display information on
        the exam depending on whether the exam has been
        attempted, assigned, or unavailable to take yet.
    Date Created: 10/17/21

    Notes for Future iterations:
        - Date: 10/25/21
        - Note From: Iteration VI
        - will need LWC metrics (b/c is what is passing in the event)
        - this is functional, but doesn't display
        - is a build-off-of component for future iterations
*/

import { LightningElement, api } from 'lwc';
import Exam_Object from '@salesforce/schema/Exam__c';

export default class LwcExamStats extends LightningElement {
    @api totalAnswers;

    @api correctAnswers;

    @api assigned;

    @api attempted;

    @api display;

    @api score;

    //Display for attempting to access exam not yet assigned 
    get attemptDisplay() {
        return !this.assigned && !this.attempted;
    }

    //Display for an exam that has yet to be attempted
    get examDisplay() {
        return this.assigned && !this.attempted;
    }

    //Display that shows the results of the "most recent" exam having been taken
    get resultsDisplay() {
        return this.assigned && this.attempted;
    }

    dispatchExamClicked = (event) => {
        const clickedExam = new CustomEvent('examClickedEvent');
        this.examClicked(event);

        this.dispatchEvent(clickedExam);
    }

    // helps display the information related to an exam clicked on by the user
    // There are 3 different views that are possible, all depending on the assigned and isPassed variables
    // event: allows the event parameter containing the exam information to be passed through
    examClicked = (event) => {
        
        let exam = event.detail;
        console.log("displayresults: " + JSON.stringify(exam));
        console.log("exam assigned? " + exam.assigned);

        if(exam.assigned == false){
            this.assigned = false;
        }else{
            if(exam.highScore != null){
                let results = exam.currentResults[0];
                console.log("results:" + JSON.stringify(results));

                let correct = results.Total_Correct__c;
                console.log("correct: " + correct);

                console.log("results:" + JSON.stringify(results));

                let total = results.Total_Answers__c;
                console.log("total: " + total);

                let examScore = (correct/total) * 100;
                examScore.toFixed(1);
                console.log("score: " + examScore);
    
                this.correctAnswers = correct;
                this.totalAnswers = total;
                this.score = examScore;
                this.assigned = true;
                this.attempted = true;
                this.display = true;
            } else{
                this.attempted = false;
                this.assigned = true;
            }

        }
    }
}

