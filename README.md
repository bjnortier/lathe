lathe.js
#

Lathe.js is an experimental Javascript mesh boolean library based on binary 
space partitioning (BSP) trees. It has been developed as a replacement for 
the solid modelling in Shapesmith.

Current state: 
##

Booleans (Unions, Intersections, Subtractions) for 
both 2D and 3D discrete geometry are working, with the following caveats:

  * Performance isn't great (see below)
  * There are some numerical robustness issues (see below)

Roadmap (help would be very much appreciated here):
##

 * Improving performance
 * Addressing numerical robustness issues properly.
 * Creating more 2D and 3D primitives types (3d cones, 2d circles, etc. etc).







