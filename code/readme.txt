  	Example: Adding a new Tab - in this case Body Tab. (done by copying what was done for Family) in index.htm
	1. Copy and paste 
	<li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#family" role="tab" aria-controls="profile" aria-selected="false"
               onclick='loadImage("peopleCategory","peopleSubCategory")'>Family</a>
      </li>
	 2. Modify Body like the following-----
          <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#body" role="tab" aria-controls="profile" aria-selected="false"
               onclick='loadImage("bodyCategory","bodySubCategory")'>Body Parts</a>
      </li>
	  
	 3. add bodyCategory and bodySubCategory in choice.js
	 
	var bodyCategory = ["body"];
	var bodySubCategory = ["chest", "ear", "eye", "hand", "hair", "nose", "teeth" ];
	
	4. Copy and Paste Family Content and Modify to Body Parts
    <!----------------------------------------------- Begin Family Content ------------------>      
    <div class="tab-pane fade" id="family" role="tabpanel" aria-labelledby="profile-tab">Family
        <div class="container">
               <div class="row" style="padding: 30px">  
            <div class="col-lg-3  col-md-3  col-sm-3  col-xs-3">
            </div>
            <div class="col-lg-6  col-md-6  col-sm-6  col-xs-6 clsAutoFit bg-success" style="padding: 10px">          
              <img src="" class="clsImg" alt="No Default Image Supplied" id="peoplequestion" />
              <div class="col-lg-12  col-md-12  col-sm-12  col-xs-12">
                   <input type="button" id="people1" class="btn btn-default btn-xl" value="" onClick="checkAnswer(this.value)">            
           
                   <input type="button" id="people2" class="btn btn-default btn-xl " value=""
                          onClick="checkAnswer(this.value)"> 
                  <input type="button" id="people3" class="btn btn-default btn-xl " value=""
                          onClick="checkAnswer(this.value)"> 
            </div>
              </div>                   
            
        </div>
          </div>     
          
    </div>    
<!----------------------------------------------- End Family Content ------------------>      
	
After modified

    <!----------------------------------------------- Begin Body Parts Content ------------------>      
    <div class="tab-pane fade" id="body" role="tabpanel" aria-labelledby="profile-tab">Body Parts
        <div class="container">
               <div class="row" style="padding: 30px">  
            <div class="col-lg-3  col-md-3  col-sm-3  col-xs-3">
            </div>
            <div class="col-lg-6  col-md-6  col-sm-6  col-xs-6 clsAutoFit bg-success" style="padding: 10px">          
              <img src="" class="clsImg" alt="No Default Image Supplied" id="bodyquestion" />
              <div class="col-lg-12  col-md-12  col-sm-12  col-xs-12">
                   <input type="button" id="body1" class="btn btn-default btn-xl" value="" onClick="checkAnswer(this.value)">            
           
                   <input type="button" id="body2" class="btn btn-default btn-xl " value=""
                          onClick="checkAnswer(this.value)"> 
                  <input type="button" id="body3" class="btn btn-default btn-xl " value=""
                          onClick="checkAnswer(this.value)"> 
            </div>
              </div>                   
            
        </div>
          </div>     
          
    </div>    
<!----------------------------------------------- End Body Parts Content ------------------>      
          
	4. Add the category and subcategory logic in the method
function setCategorySubCategory(categ, subCateg){   in file choice.js

5. Add body in the following select and the corresponding function in coins.js (this is to show body parts in All In One Tab)
<select name="lessonOption" onchange="selectLesson(this.value)">
                <option value="">Select lesson</option>
                <option value="money">Coins</option>
                <option value="people">Family</option>
                <option value="animal">Animals</option>
                <option value="body">Body Parts</option>
            </select>
			
6. Modify function selectLesson(value){ in coins.js file
			 if(value === "boyy"){
        objects = bodySubCategory;
        displayRandomObjects(false, 3, "body");
    }
	
7. Add the new category in the category array as follows
var category =  ["animal", "people", "furniture", "money", "body", "mixed"]; //default is animal
	
That is it!	
		  
		  
		  
          -------------- to make a page active modify two places. search index.htm for the following-----
          <!-- active class in the below makes the tab look different from others -->
          <!-- The show active class in the div below determines which tab is the active tab -->
    <div class="tab-pane fade show active " id="math" role="tabpanel" aria-labelledby="math-tab">
          
          