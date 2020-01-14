using System;

namespace Domain
{
  public class UserTripCard
  {
    public string AppUserId { get; set; }
    public virtual AppUser AppUser { get; set; }
    public Guid TripCardId { get; set; }
    public virtual TripCard TripCard { get; set; }
    public DateTime DateCreated { get; set; }
  }
}