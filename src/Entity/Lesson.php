<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\QrCodeController;
use App\Controller\SignPresenceController;
use App\Repository\LessonRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LessonRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(),
        new Patch(),
        new Delete(),
        new Post(
            uriTemplate: '/presence/lessons/{id}/sign',
            controller: SignPresenceController::class,
            name: 'api_sign_presence',
            security: 'is_granted("ROLE_USER")',
        ),
        new Get(
            uriTemplate: '/presence/lessons/{id}/qrcode',
            controller: QrCodeController::class,
            name: 'api_lesson_qrcode',
        ),
    ]
)]
class Lesson
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, UserLesson>
     */
    #[ORM\OneToMany(targetEntity: UserLesson::class, mappedBy: 'lesson', cascade: ['remove'], orphanRemoval: true)]
    private Collection $userLessons;

    public function __construct()
    {
        $this->userLessons = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, UserLesson>
     */
    public function getUserLessons(): Collection
    {
        return $this->userLessons;
    }

    public function addUserLesson(UserLesson $userLesson): static
    {
        if (!$this->userLessons->contains($userLesson)) {
            $this->userLessons->add($userLesson);
            $userLesson->setLesson($this);
        }

        return $this;
    }

    public function removeUserLesson(UserLesson $userLesson): static
    {
        if ($this->userLessons->removeElement($userLesson)) {
            // set the owning side to null (unless already changed)
            if ($userLesson->getLesson() === $this) {
                $userLesson->setLesson(null);
            }
        }

        return $this;
    }

    public function getUserLessonsAsString(): string
    {
        return implode('<br> ', array_map(function(UserLesson $userLesson) {
            return $userLesson->getUser()?->getEmail(); 
        }, $this->userLessons->toArray()));
    }
}
