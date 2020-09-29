query {
	users {
		_id
		firstName
		lastName
		description
		createdAt
		updatedAt
	}
}

mutation{
	createUser(data:{
		firstName:"Suwea"
		description:" MyDescript"
	}){
		_id,
		firstName
	}
}

mutation {
	updateUser(
		id: "5ed20d9063f45e78f1e3c04b"
		data: { firstName:" 123  adfaf" lastName: "  123  ", description: "   123   " }
	) {
		_id
	}
}


mutation {
	deleteUser(_id: "5ed209ff44c8676e6817cd4e") {
		_id
	}
}
