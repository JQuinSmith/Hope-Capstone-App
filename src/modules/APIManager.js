const remoteURL = "http://localhost:5002"

export default {
    get(resource, id) {
      return fetch(`${remoteURL}/${resource}/${id}`).then(result => result.json())
    },
    getComment(id) {
      return fetch(`${remoteURL}/comments?issueId=${id}`).then(result => result.json())
    },
    getAll(resource){
      return fetch (`${remoteURL}/${resource}?issueComplete=false`).then(result => result.json())
    },

    getAllComments(resource){
      return fetch (`${remoteURL}/${resource}`).then(result => result.json())
    },

    getAllMy(resource, userId) {
      return fetch(`${remoteURL}/${resource}?userId=${userId}`).then(result => result.json())
    },

    getAllMyAccepted(resource, helpingUserId) {
      return fetch(`${remoteURL}/${resource}?issueComplete=false&helpingUserId=${helpingUserId}`).then(result => result.json())
    },

    getAllMyResolved(resource, userId) {
      return fetch(`${remoteURL}/${resource}?issueComplete=true&helpingUserId=${userId}`).then(result => result.json())
    },

    delete(resource, id) {
      return fetch(`${remoteURL}/${resource}/${id}`, {
        method: "DELETE"
    })
      .then(result => result.json())
  },

  post(resource, newResource) {
    return fetch(`${remoteURL}/${resource}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newResource)
    }).then(data => data.json())
  },

  update(resource, editedResource) {
    return fetch(`${remoteURL}/${resource}/${editedResource.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedResource)
    }).then(data => data.json());
  },

  insert(resource, userId, helpingUser) {
    return fetch(`${remoteURL}/${resource}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({helpingUserId: helpingUser})
    }).then(data => data.json());
  },

  editComment(resource, userId, editedComment) {
    return fetch(`${remoteURL}/${resource}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({comment: editedComment})
    }).then(data => data.json());
  },

  complete(resource, userId, issueComplete) {
    return fetch(`${remoteURL}/${resource}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({issueComplete: issueComplete})
    }).then(data => data.json());
  }
}