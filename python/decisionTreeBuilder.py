#!/usr/bin/env python3
# -*- coding: utf-8 -*-

symbols=[([[1,2],[2,4]],"HD"),
         ([[1,2],[1,3]],"HG"),
         ([[1,2],[3,4]],"HB"),
         ([[3,4],[2,4]],"BD")
]

class Node:
    """A node of the decision tree. If the edge is in the symbol then the symbol belong to the right child, else to the left one."""
    def __init__(self,edge):
         self.left=None
         self.right=None
         self.edge=edge
         
    def addLeft(self,leftChild):
        self.left=leftChild
        
    def addRight(self,rightChild):
        self.right=rightChild
        
    def evaluate(self,s):
        if (self.edge in s):
            return self.right.evaluate(s)
        else:
            return self.left.evaluate(s)
        
class FinalNode:
    """The final node of each branch. If the symbol has the same number of edges as num_edges it is classified as self.symbol, else return UNKNOWN."""
    def __init__(self,symbol,num_edges):
        self.symbol=symbol
        self.num_edges=num_edges
        
    def evaluate(self,s):
        if (len(s)==self.num_edges):
            return self.symbol
        else:
            return "UNKNOWN"

def buildTree(symbol_list):
    """Build a decision tree that can classify any symbol in s with few comparisons"""
    
    edges=[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
    
    