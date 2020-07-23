import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../app.component.css']
})
export class DashboardComponent implements OnInit {

  title: string = 'algo-visualization';
  recursiveAlgo: string = ('Recursive algorithm is an algorithm which calls iteself with a smaller input, and\n' +
                    "it computes the result for the current input using the returned value for the smaller input.\n\n" +  
                    "It is use to solve the problems which can be broken into simpler or smaller\n" +
                    "This algorithm can solve problems like:\n" +
                    "Towers of Hanoi (TOH), Inorder/Preorder/Postorder Tree Traversals, DFS of Graph\n")
  dynAlgo: string = ("Dynamic programming algorithm (also known as dynamic optimization algorithm)\n"+
                    "caches the past result (memoization) and uses them to compute new result. It solve \n" +  
                    "complex problems by breaking it down into a collection of simpler subproblems, then \n" +
                    "it saves the result from these subproblems, and uses them for future computations")
  backtrkAlgo: string = ("Backtracking is a technique for solving problems using the recursive method,\n" +
                    "trying to form a solution incrementally, removing the solution that fail to meet the\n" +  
                    "constrains of the problem at any point of time.\n\n" +
                    '"Backtracking can be defined as a general algorithmic technique that considers searching\n' +
                    'every possible combination in order to solve a computational problem."\n')
  divNConAlgo: string = ("Divide and Conquer (DAC) is an algorithm design paradigm based on multi-branched recursion.\n" +
                    "DAC can be divided into the following three parts:\n" +  
                    "  - Divide: This involves dividing the problem into some sub problem.\n" +
                    "  - Conquer: Sub problem by calling recursively until sub problem solved\n" +
                    "  - Combine: The Sub problem Solved so that we will get find problem solution.\n"+
                    "Standard algorithms such as Binary Search, Quicksort, and Merge Sort uses DAC \n")
  greedyAlgo: string = ("A greedy algorithm is a simple, intuitive algorithm that is used in optimization problems.\n"+
                    "The algorithm makes the optimal choice at each step as it attempts to find the overall\n"+
                    "optimal way to solve the entire problem.\n" +  
                    "However, in many problems, a greedy strategy does not produce an optimal solution.\n" +
                    "An optimal choice for the current step might not lead to the best overall solution.\n")
  securityAlgo: string = ("A security algorithm is a mathematical procedure used to encrypt data.\n"+
                          "Information is encoded and requires the use of a software key to transform\n"+
                          "the data back into its original form\n")

  constructor() { }

  ngOnInit() { }

}
