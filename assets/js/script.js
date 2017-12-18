
var socket = io()
$(function(){

	var nameInput = $('#nameInput')


	nameInput.focus();
	$("#chat").hide()
	$('#formUser').submit(function(){
		$('#index').hide()
		$('#chat').show()
		socket.emit('username',nameInput.val())
		$('#inputMensaje').focus()
		return false;
	})

	socket.on('send users',function(info){
		$("#lista_conectados").text(' ')
		for (var i = info['name'].length - 1; i >= 0; i--) {
			$('#lista_conectados').append("<li class='conectados_lista'>"
				+info.name[i]+
				"</li>")
		}
		
		var p_online = 'Online ('+info.conect+')'
		$('.online').text(p_online)
		$('.bienvenido').text("Bienvenido "+ nameInput.val())
	})
	var hora
	function hora_actual(){
		var d;
		d = new Date()
		hora = d.toLocaleTimeString()
		
	}
	
	setInterval(hora_actual,1000)
	socket.on('new user',function(usuario){
		if (typeof(usuario)!= 'null') {
			$('.mensajes').append('<center><p>Se ha conectado '
				+usuario+
				'</p></center>')
		}
	})
	

	$('#formMensaje').submit(function(){
		socket.emit('send message',$('#inputMensaje').val())
		$('#inputMensaje').val("")
		return false;
	})

	socket.on('show message', function(msg){
		if (typeof(msg.msg)!= 'undefined' )
			$('.mensajes').append('<li>'+msg.msg+ '<p>'+hora+'</p>'
			 +'</li>') 
		if (typeof(msg.user)!= 'undefined') {
			$('.mensajes').append('<center><p>'
				+msg.user+
				' ha abandonado el chat</p></center>')
		}

	})


})



function busca(v){
	var usuarios = [];
	var msg = document.getElementsByClassName('conectados_lista');
	if (v!=0) {
		for (var i = msg.length - 1; i >= 0; i--) {
			if (v==msg[i].innerHTML.substring(0,v.length)) {
				msg[i].style.display = 'block'
			} else {
				msg[i].style.display = 'none'
			}
		}
	} else{
		for (var i = msg.length - 1; i >= 0; i--) {
			msg[i].style.display = 'block'
		}
	}
}