class Course{
    title: string
    description : string
    instructor : string
    duration: string
    reviews : string

    constructor(title: string, description : string,instructor : string,duration: string,reviews:string) {
      this.title = title;
      this.description = description;
      this.instructor=instructor;
      this.duration=duration;
      this.reviews=reviews;
    }
}

export default Course