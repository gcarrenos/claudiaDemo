// First Action Validator 

entitiesList = [];
baseEntity = {};

$(document).on('submit', 'form.baseEntity', function(e) {
   e.preventDefault(e);

   // Create Objects
   baseEntity = {
      baseEntity: $("#base_level_entity", this).val(),
      legalForm: $("#legal_form", this).val(),
      fullName: $("#fullName", this).val(),
      boardList: $("#boardlist", this).val(),
      beneficiary: $("#beneficiary", this).val(),
      influenced: $("#influened", this).val(),
      id: 1
   };

   console.log(baseEntity)

   entitiesList.push(baseEntity);  


   chart = {
      "class": "go.TreeModel",
      "nodeDataArray": [{
         "key": 1,
         "name": baseEntity.baseEntity,
         "CEO": baseEntity.fullName
      }]
   }


   // Store Local Data 
   localStorage.setItem('baseEntity', JSON.stringify(baseEntity));

   //Check if no need 2 declare
   if (
      ($("#legal_form").val() == "byebye") ||
      ($("#q3_1").is(':checked')) ||
      ($("#radio_1").is(':checked')) ||
      ($("#radio1_1").is(':checked')) ||
      ($("#radio2_1").is(':checked'))
   ) {

      $('#noDeclare').modal('show');
   } else {
      load();
      $("div.firstForm").fadeOut(500);
      $("div.addEntityBtn").removeClass('d-none').fadeIn(500);

      // Add Base to Dropdown
      $('#parentEntity').append($('<option>', {
         value: baseEntity.id,
         text: baseEntity.baseEntity
     }));

   }
});



// Entity Adder

$(document).ready(function() { 
    $('#addEntityBtn').click(function() {
        $('form.addEntityForm').submit();
    });
});



$(document).on('submit', 'form.addEntityForm', function(e) {
   e.preventDefault(e);

   // Create Objects
   tempEntity = {
      shareHolder: $("#shareHolder", this).val(),
      capitalShare: $("#capitalShare", this).val(),
      legalForm: $("#legal_form", this).val(),
      fullName: $("#fullName", this).val(),
      boardList: $("#boardlist", this).val(),
      beneficiary: $("#beneficiary", this).val(),
      influenced: $("#influenced", this).val(),
      id: entitiesList.length+1
   };

   console.log(tempEntity)

   //Push New Entity to ArrayList
   entitiesList.push(tempEntity);  

   localStorage.setItem('entitiesList', JSON.stringify(entitiesList));
 

    // Add Base to Dropdown
      $('#parentEntity').append($('<option>', {
         value: tempEntity.id,
         text: tempEntity.shareHolder
   }));


   //add to Chart

   chart.nodeDataArray.push({
         "key": tempEntity.id,
         "name": tempEntity.shareHolder,
         "CEO": tempEntity.fullName,
         "parent":$("#parentEntity").val()
   })


   $('#addEntity').modal('hide');
   $('.addEntityForm')[0].reset();
   load();


});