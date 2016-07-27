<template>
	<div class="container">
		<form>
			<div class="group">      
        <i class="fa fa-search"></i>
				<input type="text" placeholder="name" required>
				<span class="bar"></span>
			</div>
		</form>
	</div>
</template>
<style lang="less" scoped>
.container{
  width: 300px;
}
.group { 
  position:relative; 
  width: 100%;
  margin-bottom:45px; 
  i{
    position:absolute;
    top: 50%;    
    transform: translate(100%,-50%);
  }
}
input{
  font-size:18px;
  padding:10px 10px 10px 5px;
  text-indent: 2em;
  display:block;
  width:300px;
  border:none;
  border-bottom:1px solid #757575;
}
input:focus{ outline:none; }

/* BOTTOM BARS ================================= */
.bar{ position:relative; display:block; width:315px; }
.bar:before, .bar:after 	{
  content:'';
  height:2px; 
  width:0;
  bottom:1px; 
  position:absolute;
  background:#5264AE; 
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
.bar:before {
  left:50%;
}
.bar:after {
  right:50%; 
}

/* active state */
input:focus ~ .bar:before, input:focus ~ .bar:after {
  width:50%;
}

</style>