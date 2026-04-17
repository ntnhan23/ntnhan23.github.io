---
title: "Optimizing Depth-First Search for Graph Cycles"
date: "2026-05-15"
author: "Thành Nhân"
tags: "Algorithms"
summary: "When tackling complex competitive programming challenges on Codeforces or LeetCode, identifying graph cycles efficiently is paramount."
---

When tackling complex competitive programming challenges on Codeforces or LeetCode, identifying graph cycles efficiently is paramount. Standard DFS implementations are elegant but can sometimes suffer when dealing with densely connected cyclic components, causing TLE (Time Limit Exceeded) errors.

## Core Algorithm Redesign

Traditionally, graph traversal utilizes a simple boolean array `visited[N]`. However, to efficiently detect cycles and backtrack gracefully, adopting a **three-state coloring scheme** (0: unvisited, 1: currently in path stack, 2: fully processed) drastically reduces redundant evaluations.

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> adj;
vector<int> state;

bool hasCycle(int node) {
    if (state[node] == 1) return true; // Found a back-edge
    if (state[node] == 2) return false; // Already processed
    
    state[node] = 1; // Mark as currently exploring
    
    for (int neighbor : adj[node]) {
        if (hasCycle(neighbor)) return true;
    }
    
    state[node] = 2; // Mark as fully visited
    return false;
}
```

## Why this matters in Competitive Programming

This `O(V + E)` approach is significantly more robust than backtracking purely on `visited` flags. It helps prune search trees dynamically, meaning your execution avoids getting trapped in redundant sub-graphs. 

- Eliminates unnecessary tree depth recursions.
- Maintains exact paths using parent tracking.
- Easy to extend to topological sorting algorithms natively.

Testing this approach on massive datasets with 10^5 vertices proves that an explicit three-state cache prevents worst-case recursion depths, securing that heavily sought-after "Accepted" verdict.
