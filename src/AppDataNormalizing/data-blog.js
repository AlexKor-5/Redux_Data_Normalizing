const blog = {
    id: 4000,
    title: "My little blog",
    posts: [
        {
            id: 100,
            text: "Text of post and things like that",
            author: {id: 40, name: "Den", surname: "Miller"},
            comments: [
                {
                    id: 320,
                    content: "How to do this?",
                    commenter: {id: 897, name: "Rob", surname: "Merton"}
                },
                {
                    id: 560,
                    content: "What are you writing about?",
                    commenter: {id: 356, name: "Lee", surname: "Lui"}
                }
            ]
        },
        {
            id: 200,
            text: "Great post of mine",
            author: {id: 50, name: "Alice", surname: "Deb"},
            comments: []
        },
        {
            id: 300,
            text: "My text information and so on",
            author: {id: 60, name: "Mike", surname: "Shelly"},
            comments: [
                {
                    id: 210,
                    content: "How long does it take?",
                    commenter: {id: 912, name: "Alice", surname: "Jobs"}
                }
            ]
        }
    ]
}
export default blog