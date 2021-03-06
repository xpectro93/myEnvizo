const express = require('express');
const router = express.Router();
const {
  getAllSubmissions,
  getAllSubmissionForSingleGoal,
  getAllSubmissionsPerUserPerGoal,
  createNewSubmission,
  deleteSubmission,
  countSubPerGoal,
  getLeaderBoard
} = require('../db/queries/SubmissionQueries');


router.get('/', getAllSubmissions);
router.get('/count/:goalId',countSubPerGoal);
router.get('/goal/:goalId', getAllSubmissionForSingleGoal);
router.get('/user/:user_id/:goal_id', getAllSubmissionsPerUserPerGoal);
router.get('/top',getLeaderBoard);
router.post('/user/:user_id', createNewSubmission);
router.delete('/:submissionId', deleteSubmission);


module.exports = router;
